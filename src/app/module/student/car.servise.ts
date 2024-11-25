import { TCar } from './car.interface';
import { CarModel } from './car.model';
import { ObjectId } from 'mongodb';

// Function to create a new car entry
const createCar = async (carsData: TCar) => {
  try {
    const car = new CarModel(carsData);
    const result = await car.save(); // Await the save operation to ensure completion
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating car:', error.message || error); // Log the error with a helpful message
    throw new Error(error.details || 'Failed to create car'); // Throw an error to propagate
  }
};

// Function to find all car data
const findAllCarData = async () => {
  try {
    const result = await CarModel.find(); // Fetch all car data asynchronously
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Function to find a car by its ID
const findOneCarData = async (carId: string) => {
  // Use lowercase 'string' for consistency
  try {
    const result = await CarModel.findOne({ _id: new ObjectId(carId) }); // Convert string _id to ObjectId
    return result;
  } catch (error) {
    console.error('Error fetching car data by ID:', error); // Enhanced error logging
    throw new Error('Error fetching car data by ID');
  }
};
const deleteSingleCarData = async (carId: string) => {
  // Use lowercase 'string' for consistency
  try {
    const result = await CarModel.findByIdAndDelete({
      _id: new ObjectId(carId),
    }); // Convert string _id to ObjectId
    return result;
  } catch (error) {
    console.error('Error fetching car data by ID:', error); // Enhanced error logging
    throw new Error('Error fetching car data by ID');
  }
};

 
const updateOneCarData = async (carId: string, updateData: TCar) => {
  // Use lowercase 'string' for consistency
  try {
    const result = await CarModel.findByIdAndUpdate(
      new ObjectId(carId),
      updateData,
      { new: true },
    ); // Convert string _id to ObjectId

    return result;
  } catch (error) {
    console.error('Error fetching car data by ID:', error); // Enhanced error logging
    throw new Error('Error fetching car data by ID');
  }
};

export const carServises = {
  createCar,
  findAllCarData,
  findOneCarData,
  updateOneCarData,
  deleteSingleCarData,
};
