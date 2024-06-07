import OrdersModel from '@models/order';
import { getCurrentDate } from '@utils/date';
import { BaseRequestHandler } from 'types/common';

export const getAllOrders: BaseRequestHandler = async (req, res) => {
  try {
    const orders = await OrdersModel.find()
      .populate({
        path: 'user',
        select: '-password -token',
      })
      .populate('items.product');

    const ordersCount = await OrdersModel.find().countDocuments();

    return res.status(200).json({
      success: true,
      message: 'all orders',
      data: orders,
      ordersCount,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const changeStatusOfOrder: BaseRequestHandler<{ status: string; id: string }> = async (
  req,
  res,
) => {
  try {
    const { status, id } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: 'status or order Id is missing',
      });
    }
    if (!['delivered', 'pending', 'shipped'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'wrong status',
      });
    }

    const today = await getCurrentDate();

    let statusUpdate;
    if (status == 'shipped') {
      statusUpdate = await OrdersModel.findOneAndUpdate(
        { _id: id },
        { status: status, shippedOn: today },
        { new: true },
      );
    } else if (status == 'delivered') {
      statusUpdate = await OrdersModel.findOneAndUpdate(
        { _id: id },
        { status: status, deliveredOn: today },
        { new: true },
      );
    } else {
      statusUpdate = await OrdersModel.findOneAndUpdate(
        { _id: id },
        { status: status },
        { new: true },
      );
    }

    return res.status(200).json({
      success: true,
      message: 'status updated successfully',
      data: statusUpdate,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
