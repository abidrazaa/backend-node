import { Schema, model } from 'mongoose';
import { baseSchemaOptions } from '@constants/mongoose';

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    userType: String,
    password: String,
    token: String,
    wishlist: [
      new Schema(
        {
          product: { type: Schema.Types.ObjectId, ref: 'product' },
        },
        baseSchemaOptions,
      ),
    ],
    cart: [
      new Schema(
        {
          product: { type: Schema.Types.ObjectId, ref: 'product' },
          quantity: Number,
        },
        baseSchemaOptions,
      ),
    ],
  },
  baseSchemaOptions,
);

const UserModel = model('user', userSchema);

export type UserType = InstanceType<typeof UserModel>;

export default UserModel;
