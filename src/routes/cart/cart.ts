import express from 'express';

import { checkout, cart, updateCartItem, removeCartItem } from '@controllers/user/cart';
import { checkAuth } from '@middlewares/auth';

const router = express.Router();

router.get('/', [checkAuth], cart);
router.post('/checkout', [checkAuth], checkout);
router.patch('/:id', [checkAuth], updateCartItem);
router.delete('/:id', [checkAuth], removeCartItem);

export default router;
