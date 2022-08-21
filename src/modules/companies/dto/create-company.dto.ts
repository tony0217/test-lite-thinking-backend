import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}-\d{1}$/, {
    message: 'Invalid Nit',
  })
  readonly nit: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  readonly mobilephone: string;
}
