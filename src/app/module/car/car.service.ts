import QueryBuilder from '../../builder/builder';
import { TCar } from './car.interface';
import { CarModel } from './car.model';
import { ObjectId } from 'mongodb';
const searchBleFild = ['brand', 'model', 'category'];
// Function to create a new car entry
const createCar = async (payload: TCar) => {
  const result = await CarModel.create(payload); // Await the save operation to ensure completion
  return result;
};

// Function to find all car data
const findAllCarData = async (query: Record<string, unknown>) => {
  const car = new QueryBuilder(CarModel.find(), query)
    .search(searchBleFild)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await car.countTotal();
  const data = await car.modelQuery;
  return { meta, data };
};

// Function to find a car by its ID
const findOneCarData = async (carId: string) => {
  // Use lowercase 'string' for consistency
  const result = await CarModel.findOne({ _id: new ObjectId(carId) }); // Convert string _id to ObjectId
  return result;
};
const deleteSingleCarData = async (carId: string) => {
  // Use lowercase 'string' for consistency

  const result = await CarModel.findByIdAndDelete({
    _id: new ObjectId(carId),
  }); // Convert string _id to ObjectId
  return result;
};

const updateOneCarData = async (carId: string, updateData: TCar) => {
  // Use lowercase 'string' for consistency

  const result = await CarModel.findByIdAndUpdate(
    new ObjectId(carId),
    updateData,
    { new: true },
  ); // Convert string _id to ObjectId

  return result;
};

export const carServices = {
  createCar,
  findAllCarData,
  findOneCarData,
  updateOneCarData,
  deleteSingleCarData,
};
