import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { isValidObjectId, Model } from 'mongoose';

import { PaginationDto } from '@/core/dto/pagination.dto';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,

    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = 5;
  }

  async create(createCompanyDto: CreateCompanyDto) {
    createCompanyDto.name = createCompanyDto.name.toLocaleLowerCase();

    try {
      const company = await this.companyModel.create(createCompanyDto);
      return {
        status: 'success',
        message: `Company ${company.name} created successfully`,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, page = 1 } = paginationDto;
    const $match = {};
    const $project = {
      _id: '$_id',
      name: '$name',
      address: '$address',
      nit: '$nit',
      mobilephone: '$mobilephone',
    };

    const data = await this.companyModel
      .aggregate([
        {
          $match,
        },
        {
          $facet: {
            totalData: [
              { $match: {} },
              { $skip: (page - 1) * limit },
              { $limit: limit },
              {
                $project,
              },
            ],
            totalCount: [{ $count: 'count' }],
          },
        },
      ])
      .exec();

    const total = data[0]?.totalCount[0]?.count || 0;
    return {
      total,
      page,
      companies: data[0].totalData,
      nextPage: page + 1 <= Math.ceil(total / limit) ? page + 1 : null,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(term: string) {
    let company: Company;

    // Name
    if (term.length > 0) {
      company = await this.companyModel.findOne({ name: term }).lean();
    }

    // MongoID
    if (!company && isValidObjectId(term)) {
      company = await this.companyModel.findById(term);
    }

    // Nit
    if (!company) {
      company = await this.companyModel.findOne({ nit: term }).lean();
    }

    if (!company)
      throw new NotFoundException(
        `company with id,name or Nit "${term}" not found`,
      );

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if (updateCompanyDto.name)
      updateCompanyDto.name = updateCompanyDto.name.toLowerCase();

    try {
      await company.updateOne(updateCompanyDto);
      // return { ...company.toJSON(), ...updateCompanyDto };
      return {
        status: 'success',
        message: `Company updated successfully`,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.companyModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Company with id "${id}" not found`);

    return {
      status: 'success',
      message: `Company deleted successfully`,
    };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `company exists in db with ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create company - Check server logs`,
    );
  }
}
