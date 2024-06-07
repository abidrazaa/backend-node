import { RouterMap } from '../types/common';

import appRouter from './app';
import authRouter from './auth/auth';
import adminRouter from './admin/admin';
import cartRouter from './cart/cart';
import usersRouter from './users/users';
import ordersRouter from './orders/orders';
import productsRouter from './products/products';
import categoriesRouter from './categories/categories';
import wishlistRouter from './wishlist/wishlist';

const routeMaps: RouterMap = {
  '/': appRouter,
  '/admin': adminRouter,
  '/auth': authRouter,
  '/cart': cartRouter,
  '/users': usersRouter,
  '/orders': ordersRouter,
  '/products': productsRouter,
  '/categories': categoriesRouter,
  '/wishlist': wishlistRouter,
};

export const routes = routeMaps;
