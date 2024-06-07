import { Schema, model } from 'mongoose';
import { baseSchemaOptions } from '@constants/mongoose';

const orderSchema = new Schema(
  {
    orderId: String,
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items: [
      new Schema(
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'Please add product id in items list'],
          },
          quantity: { type: Number, required: [true, 'Please add quantity in items list'] },
          price: { type: Number, required: [true, 'Please add price in items list'] },
        },
        baseSchemaOptions,
      ),
    ],
    amount: Number,
    discount: Number,
    shippingAddress: String,
    status: { type: String, enum: ['pending', 'shipped', 'delivered'] },
    country: { type: String },
    city: { type: String },
    zipcode: { type: String },
    payment_type: { type: String, enum: ['cod', 'online'] },
    shippedOn: { type: String },
    deliveredOn: { type: String },
  },
  baseSchemaOptions,
);

const OrderModel = model('order', orderSchema);

export type OrderType = InstanceType<typeof OrderModel>;

export default OrderModel;
