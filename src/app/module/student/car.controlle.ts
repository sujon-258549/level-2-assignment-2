/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { carServises } from './car.servise';
import carZodSchemaValidaction from './car.zod';

const createCar = async (req: Request, res: Response) => {
  try {
    const data = req.body.car;
    // zod validaction
    const zodValidactionCar = carZodSchemaValidaction.parse(data);
    const result = await carServises.createCar(zodValidactionCar);
    res.status(200).json({
      seccess: true,
      message: 'Car create success',
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Car',
      error: error,
    });
  }
};

const findAllcarC = async (req: Request, res: Response) => {
  try {
    const result = await carServises.findAllCarData();
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: 'Cars retrieved error',
      error: error.details || error.message || 'An unexpected error occurred',
    });
  }
};

const findOneCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carServises.findOneCarData(carId);
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: 'Cars retrieved error',
      error: error.details || error.message || 'An unexpected error occurred',
    });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params; // Get carId from URL params
    const updateData = req.body; // Get data to update from the request body

    const updatedCar = await carServises.updateOneCarData(carId, updateData); // Call the update function
    // Return success response with the updated car data
    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      result: updatedCar,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update car',
      error: error.message || 'An unexpected error occurred',
    });
  }
};
const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params; // Get carId from URL params

    await carServises.deleteSingleCarData(carId); // Call the update function
    // Return success response with the updated car data
    res.status(200).json({
      success: true,
      message: 'Car Delete  successfully',
      result: {},
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to Deleted car',
      error: error.message || 'Failed to Deleted car',
    });
  }
};

export const carController = {
  createCar,
  findAllcarC,
  findOneCar,
  updateCar,
  deleteCar,
};