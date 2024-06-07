import ProductModel, { ProductType } from '@models/product';
import Pagination from '@utils/pagination';
import { BaseRequestHandler } from 'types/common';

export const addProduct: BaseRequestHandler<ProductType> = async (req, res) => {
  try {
    const { title, sku, price, quantity } = req.body;

    if (!title || !sku || !price || !quantity)
      return res.status(400).json({ err: 'Fields are empty' });

    const product = new ProductModel(req.body);
    await product.save();

    return res.json({
      success: true,
      message: 'Product inserted successfully',
      data: product,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const updateProduct: BaseRequestHandler<ProductType> = async (req, res) => {
  try {
    const { title, sku, price, image } = req.body;
    const { id } = req.params;
    const updateValues = { title, sku, price, image };

    // check if product exist with the given product id
    const product = await ProductModel.findOne({ _id: id });

    if (product) {
      const updatedProduct = await ProductModel.findOneAndUpdate({ _id: id }, updateValues, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: 'product updated successfully',
        data: updatedProduct,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'product does not exist',
      });
    }
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const deleteProduct: BaseRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // check if product exist with the given product id
    const product = await ProductModel.findOneAndDelete({ _id: id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product does not exist',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'product deleted successfully',
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const getProduct: BaseRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // check if product exist with the given product id
    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product does not exist',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'product fetched successfully',
      data: product,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const getAllProducts: BaseRequestHandler = async (req, res) => {
  try {
    // Search through title names
    const { _search: searchQ } = req.query;
    let search = searchQ || '';

    if (!search) search = '';

    const pagination = new Pagination(req.query);
    const filter = { title: { $regex: search, $options: 'i' } };

    const [products, count] = await Promise.all([
      ProductModel.find(filter, null, pagination).populate('category'),
      ProductModel.find(filter).countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: 'list of products',
      data: products,
      count,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryProducts: BaseRequestHandler = async (req, res) => {
  try {
    // Search through title names
    const { _search: searchQ } = req.query;
    const { id: category } = req.params;
    let search = searchQ || '';

    if (!search) search = '';

    const pagination = new Pagination(req.query);
    const filter = {
      category: category,
      title: { $regex: search, $options: 'i' },
    };

    const [products, count] = await Promise.all([
      ProductModel.find(filter, null, pagination),
      ProductModel.find(filter).countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: 'list of products',
      data: products,
      count,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
