import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Company extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  readonly name: string;

  @Prop()
  readonly address: string;

  @Prop({
    unique: true,
    index: true,
  })
  readonly nit: string;

  @Prop()
  readonly mobilephone: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
