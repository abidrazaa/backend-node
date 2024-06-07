import { ObjectId } from 'mongodb';
import OrderModel, { OrderType } from '@models/order';
import ProductModel from '@models/product';
import UserModel from '@models/user';
import { extractValidationMessage } from '@utils/mongoose';
import { WithAuthRequestHandler } from 'types/common';

export const checkout: WithAuthRequestHandler<OrderType> = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;

    body.user = user?._id;
    body.orderId = crypto.randomUUID();

    // if cart is not empty and items array contains objects
    if (body?.items.length) {
      const checkout = new OrderModel(body);
      const validation = checkout.validateSync();

      if (validation?.errors) {
        return res.status(400).json({
          err: extractValidationMessage(validation),
        });
      }
      await checkout.save();

      const items = body?.items;

      const promises = items.map((item) =>
        ProductModel.findOneAndUpdate({ _id: item.product }, [
          {
            $set: {
              quantity: {
                $subtract: ['$quantity', item.quantity],
              },
            },
          },
        ]),
      );

      await Promise.all(promises);

      return res.status(200).json({
        success: true,
        message: 'successful checkout',
        data: checkout,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'please provide items list',
      });
    }
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const addProductToCart: WithAuthRequestHandler<{ quantity: number }> = async (req, res) => {
  try {
    const { id: product } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    if (!product || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'provide required fields',
      });
    }

    const addToCart = await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $push: { cart: { product, quantity } },
      },
      { new: true },
    ).select('-wishlist -token -password');

    return res.status(200).json({
      success: true,
      message: 'product pushed in cart successfully',
      data: addToCart,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const removeProductFromCart: WithAuthRequestHandler = async (req, res) => {
  try {
    const { id: product } = req.params;
    const user = req.user;

    const removeFromCart = await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $pull: { cart: { product: ObjectId.createFromHexString(product) } },
      },
      { new: true },
    ).select('-wishlist -token -password');

    return res.json({
      success: true,
      message: 'product removed from cart successfully',
      data: removeFromCart,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const removeCartItem: WithAuthRequestHandler = async (req, res) => {
  try {
    const { id: cartId } = req.params;
    const user = req.user;

    const removeFromCart = await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $pull: { cart: { _id: ObjectId.createFromHexString(cartId) } },
      },
      { new: true },
    ).select('-wishlist -token -password');

    return res.json({
      success: true,
      message: 'cart item removed successfully',
      data: removeFromCart,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const updateCartItem: WithAuthRequestHandler<{ quantity: number }> = async (req, res) => {
  try {
    const { id: cartId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const cart = await UserModel.findOneAndUpdate(
      { _id: user?._id, 'cart._id': cartId },
      {
        $set: { 'cart.$.quantity': quantity },
      },
      { new: true, upsert: true },
    )
      .populate('cart.product')
      .select('-wishlist -token -password');

    return res.status(200).json({
      success: true,
      message: 'cart item updated successfully',
      data: cart,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const cart: WithAuthRequestHandler = async (req, res) => {
  try {
    const user = req.user;

    const cart = await UserModel.find({
      _id: user._id,
    })
      .populate('cart.product')
      .select('-password -token -wishlist -userType');

    return res.status(200).json({
      success: true,
      message: 'cart',
      data: cart || [],
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
