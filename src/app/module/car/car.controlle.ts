/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { carServices as carServices } from './car.service';
import { sendSuccess } from '../../utility/sendSuccess';
import httpStatus from 'http-status';
import catchAsync from '../../utility/catchAsync';

const createCar = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // @ts-expect-error files
  const result = await carServices.createCar(data, req.files, req.user);
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});

const findAllcarC = catchAsync(async (req: Request, res: Response) => {
  const result = await carServices.findAllCarData(req.query);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    meta: result?.meta,
    data: result,
  });
});

const findOneCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  const result = await carServices.findOneCarData(carId);
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

// update course
const updateCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params; // Get carId from URL params
  const updateData = req.body; // Get data to update from the request body
  const updatedCar = await carServices.updateOneCarData(
    carId,
    updateData,
    // @ts-expect-error files
    req.files,
  ); // Call the update function
  // Return success response with the updated car data
  sendSuccess(res, {
    statusCod: httpStatus.CREATED,
    success: true,
    message: 'Car updated successfully',
    data: updatedCar,
  });
});
const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params; // Get carId from URL params

  await carServices.deleteSingleCarData(carId); // Call the update function
  // Return success response with the updated car data
  sendSuccess(res, {
    statusCod: httpStatus.OK,
    success: true,
    message: 'Car Delete  successfully',
  });
});

export const carController = {
  createCar,
  findAllcarC,
  findOneCar,
  updateCar,
  deleteCar,
};
