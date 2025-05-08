/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';

import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserModel } from '../useRegistration/user.registration.model';
import AppError from '../../Error/appError';
import { sendImageToCloudinary } from '../../utility/sendImageToCloudinary';
import { TCarShop } from './shop.interface';
import { CarShop } from './shop.model';

const createShopIntoDB = async (
  payload: TCarShop,
  file: any,
  user: JwtPayload,
) => {
  console.log('payload......', payload, file, user);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isUserExist = await UserModel.findOne({
      _id: user.id,
    }).session(session);

    if (!isUserExist) {
      throw new AppError(status.NOT_FOUND, 'User not found');
    }

    if (isUserExist?.isShop) {
      throw new AppError(
        status.FORBIDDEN,
        'You are not allowed to create shop',
      );
    }

    const isMealProviderExist = await CarShop.findOne({
      authorShopId: user.id,
    }).session(session);

    if (isMealProviderExist) {
      throw new AppError(status.CONFLICT, 'This user already shop create');
    }
    if (file) {
      const path = file.path;
      const name = payload.shopName.replace(/\s+/g, '_').toLowerCase();

      const { secure_url } = (await sendImageToCloudinary(name, path)) as {
        secure_url: string;
      };

      payload.shopLogo = secure_url;
    }

    payload.authorShopId = user.id;

    payload.authorShopId = isUserExist._id;

    const newMealProvider = await CarShop.create([payload], { session });
    if (!newMealProvider.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create Meal Provider');
    }
    // @ts-expect-error shop
    isUserExist?.isShop = true;
    await isUserExist.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return newMealProvider[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMyShopIntoDB = async (user: JwtPayload) => {
  const result = await CarShop.findOne({ authorShopId: user.id }).populate(
    'authorShopId',
  );
  return result;
};

const updateShopIntoDB = async (
  payload: Partial<TCarShop>,
  file: any,
  user: JwtPayload,
) => {
  const isExistMealProvider = await CarShop.findOne({ authorShopId: user.id });
  if (!isExistMealProvider) {
    throw new AppError(status.NOT_FOUND, 'Car shop not found');
  }

  if (file) {
    const path = file.path;
    const name =
      (payload.shopName?.replace(/\s+/g, '_').toLowerCase() ??
        isExistMealProvider.shopName) ||
      isExistMealProvider.shopName;

    const { secure_url } = (await sendImageToCloudinary(name, path)) as {
      secure_url: string;
    };

    if (!secure_url) {
      throw new AppError(
        status.BAD_REQUEST,
        'Failed to upload image to Cloudinary',
      );
    }

    payload.shopLogo = secure_url;
  }

  const result = await CarShop.findOneAndUpdate(
    { authorShopId: user.id },
    payload,
    {
      new: true,
    },
  );

  return result;
};

export const carShopServices = {
  createShopIntoDB,
  getMyShopIntoDB,
  updateShopIntoDB,
};
