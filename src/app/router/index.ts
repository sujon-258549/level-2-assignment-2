import { Router } from 'express';
import { carRouter } from '../module/car/car.router';
import { orderRouter } from '../module/order/order.router';
import { userRegistrationRouter } from '../module/useRegistration/user.registation.router';
import { blogRouter } from '../module/blog/blog.router';
import { shopRouters } from '../module/shop/shop.route';

const router = Router();

const allroute = [
  {
    path: '/cars',
    router: carRouter,
  },
  {
    path: '/orders',
    router: orderRouter,
  },
  {
    path: '/user',
    router: userRegistrationRouter,
  },
  {
    path: '/blog',
    router: blogRouter,
  },
  {
    path: '/shop',
    router: shopRouters,
  },
];

allroute.forEach((route) => router.use(route.path, route.router));

export default router;
