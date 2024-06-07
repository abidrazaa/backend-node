import express from 'express';
import { getAllOrders, changeStatusOfOrder } from '@controllers/admin/orders';
import { dashboardData } from '@controllers/admin/dashboard';
import { isAdmin } from '@middlewares/auth';

const router = express.Router();

// DASHBOARD
router.get('/dashboard', [isAdmin], dashboardData);

// ORDERS
router.get('/orders', [isAdmin], getAllOrders);
router.patch('/order-status', [isAdmin], changeStatusOfOrder);

export default router;
