import express from 'express';

import { removeWishlistItem, wishlist } from '@controllers/user/wishlist';
import { checkAuth } from '@middlewares/auth';

const router = express.Router();

router.get('/', [checkAuth], wishlist);
router.delete('/:id', [checkAuth], removeWishlistItem);

export default router;
