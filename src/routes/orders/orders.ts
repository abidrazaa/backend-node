import express from 'express';

import { getOrder, getOrders } from '@controllers/user/orders';
import { checkAuth } from '@middlewares/auth';

const router = express.Router();

router.get('/', [checkAuth], getOrders);
router.get('/:id', [checkAuth], getOrder);

export default router;
