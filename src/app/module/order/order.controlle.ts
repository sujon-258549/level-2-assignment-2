import catchAsync from '../../utility/catchAsync';
import { sendSuccess } from '../../utility/sendSuccess';
import { OrderModel } from './order.model';
import { orderServices } from './order.servises';
import { orderZodSchema } from './order.zod';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createorder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const orderZoodvalidaction = orderZodSchema.parse(data);
  const result = await orderServices.createOrder(orderZoodvalidaction);
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    message: 'Order created successfully',
    success: true,
    data: result,
  });
});

const getRevenue = catchAsync(async (req: Request, res: Response) => {
  const revenue = await OrderModel.aggregate([
    {
      $project: {
        totalPrices: { $multiply: ['$totalPrice', '$quantity'] }, // Calculate total revenue for each document
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalRevenue: { $sum: '$totalPrices' }, // Sum up all calculated revenues
      },
    },
  ]);

  sendSuccess(res, {
    statusCod: httpStatus.OK,
    message: 'Revenue calculated successfully',
    success: true,
    data: {
      totalRevenue: revenue.length > 0 ? revenue[0].totalRevenue : 0, // Handle empty result
    },
  });
});

export const orderController = {
  createorder,
  getRevenue,
};
