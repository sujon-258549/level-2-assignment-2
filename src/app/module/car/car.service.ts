import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/builder';
import { sendImageToCloudinary } from '../../utility/sendImageToCloudinary';
import { searchTram, TCar } from './car.interface';
import { CarModel } from './car.model';
import { ObjectId } from 'mongodb';
import { UserModel } from '../useRegistration/user.registration.model';
import httpStatus from 'http-status';
import AppError from '../../Error/appError';
// Function to create a new car entry
const createCar = async (
  payload: TCar,
  productImage: { images: { path: string }[] },
  user: JwtPayload,
) => {
  const existUser = await UserModel.findById(user.id);
  if (!existUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }
  // @ts-expect-error ids
  payload.id = existUser._id;

  if (productImage?.images?.length > 0) {
    const uploadedUrls: string[] = [];

    for (const img of productImage.images) {
      const name = payload.brand;
      const { secure_url } = (await sendImageToCloudinary(name, img.path)) as {
        secure_url: string;
      };
      uploadedUrls.push(secure_url);
    }

    payload.image = uploadedUrls;
  }

  const result = await CarModel.create(payload);
  return result;
};

// Function to find all car data
const findAllCarData = async (query: Record<string, unknown>) => {
  const car = new QueryBuilder(CarModel.find(), query)
    .search(searchTram)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await car.countTotal();
  const data = await car.modelQuery;
  return { meta, data };
};
const findAllRegularCarData = async (query: Record<string, unknown>) => {
  const car = new QueryBuilder(CarModel.find({ isOffer: false }), query)
    .search(searchTram)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await car.countTotal();
  const data = await car.modelQuery;
  return { meta, data };
};
const offerCar = async (query: Record<string, unknown>) => {
  const car = new QueryBuilder(CarModel.find({ isOffer: true }), query)
    .search(searchTram)
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
  const result = await CarModel.findByIdAndDelete(carId); // Convert string _id to ObjectId
  return result;
};

const updateOneCarData = async (
  carId: string,
  updateData: Partial<TCar>,
  productImage: { images: { path: string }[] },
) => {
  if (productImage?.images?.length > 0) {
    const uploadedUrls: string[] = [];

    for (const img of productImage.images) {
      const name = updateData.brand as string;
      const { secure_url } = (await sendImageToCloudinary(name, img.path)) as {
        secure_url: string;
      };
      uploadedUrls.push(secure_url);
    }

    updateData.image = uploadedUrls;
  }
  console.log(updateData);
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
  offerCar,
  findAllRegularCarData,
};
