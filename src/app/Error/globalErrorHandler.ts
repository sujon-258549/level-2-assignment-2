/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import config from '../config';
import { TerrorSours } from '../interface';
import handelZodError from './handelZodError';
import handelMongosValidactionError from './handelMongosValidactionError';
import handelMongosValidactionCastError from './handelMongosValidactionCastError';

import AppError from './appError';
import handleMongooseValidationUniqueIdError from './handelMongosValidactionUnicIdError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  let statusCod = 500;
  let message = error.message || 'Something went wrong.';

  let errorSourse: TerrorSours = [
    {
      path: '',
      message: error.message || 'Something went wrong.',
    },
  ];
  if (error instanceof ZodError) {
    const zodErrorDetail = handelZodError(error);
    statusCod = zodErrorDetail.statusCod;
    message = zodErrorDetail.message;
    errorSourse = zodErrorDetail.errorSours;
  } else if (error.name === 'ValidationError') {
    const mongoseValidactionErrorDetail = handelMongosValidactionError(error);
    statusCod = mongoseValidactionErrorDetail.statusCod;
    message = mongoseValidactionErrorDetail.message;
    errorSourse = mongoseValidactionErrorDetail.errorSours;
  } else if (error.name === 'CastError') {
    const simplifiedError = handelMongosValidactionCastError(error);
    statusCod = simplifiedError.statusCod;
    message = simplifiedError.message;
    errorSourse = simplifiedError.errorSours;
  } else if (error.cod === 11000) {
    const simplefideError = handleMongooseValidationUniqueIdError(error);
    statusCod = simplefideError.statusCod;
    message = simplefideError.message;
    errorSourse = simplefideError.errorSours;
  } else if (error instanceof AppError) {
    statusCod = error.StatusCod;
    message = error.message;
    errorSourse = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSourse = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }
  res.status(statusCod).json({
    success: false,
    message,
    errorSourse,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
