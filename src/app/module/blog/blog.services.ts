/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import status from 'http-status';
import { IBlogPost } from './blog.interface';
import { BlogPost } from './blog.model';
import AppError from '../../Error/appError';
import { UserModel } from '../useRegistration/user.registration.model';
import { sendImageToCloudinary } from '../../utility/sendImageToCloudinary';
import QueryBuilder from '../../builder/builder';
const searchParams = ['title', 'excerpt', 'category', 'slug'];
const createBlog = async (payload: IBlogPost, file: any, user: JwtPayload) => {
  console.log(payload);
  const { id } = user;
  payload.id = id;
  const isExistUser = await UserModel.findById(id);

  if (!isExistUser) {
    return new AppError(status.NOT_FOUND, 'User not found');
  }

  // @ts-expect-error user
  payload.authorId = isExistUser._id;
  if (file) {
    const path = file?.buffer;
    const name = isExistUser.firstName.replace(/\s+/g, '_').toLowerCase();

    const { secure_url } = (await sendImageToCloudinary(name, path)) as {
      secure_url: string;
    };
    if (!secure_url) {
      return new AppError(status.INTERNAL_SERVER_ERROR, 'Image not found');
    }
    payload.imageUrl = secure_url;
  }
  const result = await BlogPost.create(payload);
  return result;
};

const myBlogIntoDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  console.log(user);
  console.log(user.id);
  const newUser = new QueryBuilder(
    BlogPost.find({ id: user.id }).populate('authorId'),
    query,
  )
    .search(searchParams)
    .sort()
    .fields()
    .filter();
  const meta = await newUser.countTotal();
  const data = await newUser.modelQuery;

  return { meta, data };
};

const allBlogIntoDB = async (query: Record<string, unknown>) => {
  const newUser = new QueryBuilder(BlogPost.find().populate('authorId'), query)
    .sort()
    .fields()
    .filter();
  const meta = await newUser.countTotal();
  const data = await newUser.modelQuery;

  return { meta, data };
};
const singleBlogIntoDB = async (id: string) => {
  const newUser = await BlogPost.findById(id).populate('authorId');
  return newUser;
};
const deleteBlogIntoDB = async (id: string) => {
  console.log(id);
  const newUser = await BlogPost.findByIdAndDelete(id);
  return newUser;
};

const updateBlog = async (
  payload: Partial<IBlogPost>,
  file: Express.Multer.File | undefined,
  user: JwtPayload,
  blogId: string,
) => {
  const { id } = user;
  console.log(payload, file, user, blogId);
  const isExistUser = await UserModel.findById(id);
  if (!isExistUser) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  if (file) {
    const path = file.buffer;
    const name = isExistUser.firstName.replace(/\s+/g, '_').toLowerCase();
    const { secure_url } = (await sendImageToCloudinary(name, path)) as {
      secure_url: string;
    };

    if (!secure_url) {
      throw new AppError(status.INTERNAL_SERVER_ERROR, 'Image upload failed');
    }
    payload.imageUrl = secure_url;
  }

  const updatedBlog = await BlogPost.findByIdAndUpdate(blogId, payload, {
    new: true,
  });

  if (!updatedBlog) {
    throw new AppError(status.NOT_FOUND, 'Blog not found');
  }

  return updatedBlog;
};

export const blogServices = {
  createBlog,
  myBlogIntoDB,
  allBlogIntoDB,
  singleBlogIntoDB,
  deleteBlogIntoDB,
  updateBlog,
};
