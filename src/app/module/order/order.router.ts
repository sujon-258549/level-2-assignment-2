import express from 'express';
import { orderController } from './order.controlle';
import auth, { userRole } from '../../utility/auth';

const router = express.Router();
router.post('/', auth(userRole.user), orderController.createorder);
router.get('/revenue', orderController.getRevenue);

export const orderRouter = router;
