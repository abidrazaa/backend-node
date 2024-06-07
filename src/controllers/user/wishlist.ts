import { ObjectId } from 'mongodb';
import UserModel from '@models/user';
import { WithAuthRequestHandler } from 'types/common';

export const addProductToWishlist: WithAuthRequestHandler = async (req, res) => {
  try {
    const { id: product } = req.params;
    const user = req.user;

    const addToWishlist = await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $push: { wishlist: { product } },
      },
      { new: true },
    ).select('-password -userType -token -cart');

    return res.json({
      success: true,
      message: 'product pushed in wishlist successfully',
      data: addToWishlist,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const removeProductFromWishlist: WithAuthRequestHandler = async (req, res) => {
  try {
    const { id: product } = req.params;
    const user = req.user;

    const removeFromWishlist = await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $pull: { wishlist: { product: ObjectId.createFromHexString(product) } },
      },
      { new: true },
    ).select('-password -userType -token -cart');

    return res.json({
      success: true,
      message: 'product removed from wishlist successfully',
      data: removeFromWishlist,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const removeWishlistItem: WithAuthRequestHandler = async (req, res) => {
  try {
    const { id: wishlistId } = req.params;
    const user = req.user;

    const removeFromWishlist = await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $pull: { wishlist: { _id: ObjectId.createFromHexString(wishlistId) } },
      },
      { new: true },
    ).select('-password -userType -token -cart');

    return res.json({
      success: true,
      message: 'wishlist item removed successfully',
      data: removeFromWishlist,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const wishlist: WithAuthRequestHandler = async (req, res) => {
  try {
    const user = req.user;

    const wishlist = await UserModel.find({
      _id: user._id,
    })
      .populate('wishlist.product')
      .select('-password -userType -token -cart');

    return res.json({
      success: true,
      message: 'Wishlist',
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
