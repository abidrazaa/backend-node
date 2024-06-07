import express from 'express';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
} from '@controllers/products/products';
import { addProductToCart, removeProductFromCart } from '@controllers/user/cart';
import { addProductToWishlist, removeProductFromWishlist } from '@controllers/user/wishlist';
import { isAdmin, checkAuth } from '@middlewares/auth';

const router = express.Router();

// PRODUCT
router.get('/', getAllProducts);
router.get('/:id', getProduct);

router.post('/', [isAdmin], addProduct);
router.patch('/:id', [isAdmin], updateProduct);
router.delete('/:id', [isAdmin], deleteProduct);

// CART
router.post('/:id/cart', [checkAuth], addProductToCart);
router.delete('/:id/cart', [checkAuth], removeProductFromCart);

// WISHLIST
router.post('/:id/wishlist', [checkAuth], addProductToWishlist);
router.delete('/:id/wishlist', [checkAuth], removeProductFromWishlist);

export default router;
