import OrderModel from '@models/order';
import { WithAuthRequestHandler } from 'types/common';

export const getOrders: WithAuthRequestHandler = async (req, res) => {
  try {
    const user = req.user;
    const orders = await OrderModel.find({ user: user._id })
      .populate({
        path: 'user',
        select: '-password -token',
      })
      .populate('items.product');

    return res.json({
      success: true,
      message: 'orders list',
      data: orders,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const getOrder: WithAuthRequestHandler = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const user = req.user;
    const order = await OrderModel.findOne({ user: user._id, _id: orderId })
      .populate({
        path: 'user',
        select: '-password -token',
      })
      .populate('items.product');

    return res.json({
      success: true,
      message: 'fetch order successful',
      data: order,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
