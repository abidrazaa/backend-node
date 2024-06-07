import express from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '@controllers/category/category';
import { getCategoryProducts } from '@controllers/products/products';
import { isAdmin } from '@middlewares/auth';

const router = express.Router();

// CATEGORIES
router.get('/', getAllCategories);
router.get('/:id', getCategory);

router.post('/', [isAdmin], addCategory);
router.patch('/:id', [isAdmin], updateCategory);
router.delete('/:id', [isAdmin], deleteCategory);

// PRODUCTS

router.get('/:id/products', getCategoryProducts);

export default router;
