import OrderModel from '@models/order';
import UserModel from '@models/user';
import ProductModel from '@models/product';
import CategoryModel from '@models/category';
import Pagination from '@utils/pagination';
import { BaseRequestHandler } from '../../types/common';

export const dashboardData: BaseRequestHandler = async (req, res) => {
  try {
    // counts
    const ordersCount = await OrderModel.find().countDocuments();
    const usersCount = await UserModel.find().countDocuments();
    const productsCount = await ProductModel.find().countDocuments();
    const categoriesCount = await CategoryModel.find().countDocuments();

    return res.json({
      success: true,
      message: 'dashboard data',
      data: {
        ordersCount,
        usersCount,
        productsCount,
        categoriesCount,
      },
    });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

export const getAllUsers: BaseRequestHandler = async (req, res) => {
  try {
    // Search through email
    const { _search: searchQ } = req.query;
    let search = searchQ || '';

    if (!search) search = '';

    const pagination = new Pagination(req.query);

    const users = await UserModel.find(
      {
        email: { $regex: search, $options: 'i' },
      },
      null,
      pagination,
    ).select('-password -token');

    const count = await UserModel.find().countDocuments();

    return res.json({
      success: true,
      message: 'all users',
      data: users,
      count,
    });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};
