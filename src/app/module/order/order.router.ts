import express from 'express';
import { orderController } from './order.controlle';

const router = express.Router();
router.post('/', orderController.createorder);
router.get('/revenue', orderController.getRevenue);

export const orderRouter = router;
