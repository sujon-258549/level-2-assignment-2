import express from 'express';
import { orderController } from './order.controlle';
import auth, { userRole } from '../../utility/auth';

const router = express.Router();
router.get('/verify', auth(userRole.user), orderController.verifyPayment);
router.post('/', auth(userRole.user), orderController.createorder);
router.get('/', auth(userRole.admin), orderController.getAllOrder);
router.get('/get-myorder', auth(userRole.user), orderController.getMyOrder);
router.get(
  '/:id',
  auth(userRole.admin, userRole.user),
  orderController.getOneOrder,
);
router.delete(
  '/id',
  auth(userRole.admin, userRole.user),
  orderController.deleteOrder,
);
// router.get('/revenue', orderController.getRevenue);

export const orderRouter = router;
