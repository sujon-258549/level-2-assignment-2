import { OrderModel } from './order.model';
import { orderServises } from './order.servises';
import { orderZodSchema } from './order.zod';
import { Request, Response } from 'express';

const createorder = async (req: Request, res: Response) => {
  //   console.log()

  try {
    const data = req.body;

    const orderZoodvalidaction = orderZodSchema.parse(data);
    const result = await orderServises.createOrder(orderZoodvalidaction);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.message,
      error: error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
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

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue: revenue.length > 0 ? revenue[0].totalRevenue : 0, // Handle empty result
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error calculating revenue',
      error: error.message,
    });
  }
};

export const orderController = {
  createorder,
  getRevenue,
};
