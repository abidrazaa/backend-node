import { Schema, model } from 'mongoose';
import { baseSchemaOptions } from '@constants/mongoose';

const categorySchema = new Schema(
  {
    title: { type: String, required: [true, 'Please add a title'] },
    image: { type: String, default: null },
    icon: { type: String, default: null },
    description: { type: String, required: [true, 'Please add a description'] },
  },
  baseSchemaOptions,
);

const CategoryModel = model('category', categorySchema);

export type CategoryType = InstanceType<typeof CategoryModel>;

export default CategoryModel;
