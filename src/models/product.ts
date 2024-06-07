import { Schema, model } from 'mongoose';
import { baseSchemaOptions } from '@constants/mongoose';

const productSchema = new Schema(
  {
    title: String,
    sku: { type: String },
    price: Number,
    image: String,
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    quantity: Number,
  },
  baseSchemaOptions,
);

const ProductModel = model('product', productSchema);

export type ProductType = InstanceType<typeof ProductModel>;

export default ProductModel;
