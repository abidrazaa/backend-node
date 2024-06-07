import CategoryModel from '@models/category';
import { extractValidationMessage } from '@utils/mongoose';
import Pagination from '@utils/pagination';
import { BaseRequestHandler } from 'types/common';

export const addCategory: BaseRequestHandler = async (req, res) => {
  try {
    const category = new CategoryModel(req.body);
    const validation = category.validateSync();
    if (validation?.errors) {
      return res.status(400).json({
        err: extractValidationMessage(validation),
      });
    }

    category.save();

    return res.status(200).json({
      success: true,
      message: 'category inserted successfully',
      data: category,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const getAllCategories: BaseRequestHandler = async (req, res) => {
  try {
    // Search through title
    const { _search: searchQ } = req.query;
    let search = searchQ || '';

    if (!search) search = '';

    const pagination = new Pagination(req.query);
    const filter = { title: { $regex: search, $options: 'i' } };

    const [categories, count] = await Promise.all([
      CategoryModel.find(filter, null, pagination),
      CategoryModel.find(filter).countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: 'list of all categories',
      categories,
      count,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const updateCategory: BaseRequestHandler = async (req, res) => {
  try {
    // const { title, description, image } = req.body;
    const { id } = req.params;

    // check if product exist with the given product id
    const category = await CategoryModel.findOne({ _id: id });

    if (category) {
      const updatedCategory = await CategoryModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: 'category updated successfully',
        data: updatedCategory,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'category does not exist',
      });
    }
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const deleteCategory: BaseRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // check if product exist with the given product id
    const category = await CategoryModel.findOneAndDelete({ _id: id });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'category does not exist',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'category deleted successfully',
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
export const getCategory: BaseRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // check if product exist with the given product id
    const category = await CategoryModel.findOneAndDelete({ _id: id });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'category does not exist',
      });
    }
    return res.json({
      success: true,
      message: 'category fetched successfully',
      data: category,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
