import { Router } from 'express';
import { carRouter } from '../module/car/car.router';
import { orderRouter } from '../module/order/order.router';

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
];

allroute.forEach((route) => router.use(route.path, route.router));

export default router;
