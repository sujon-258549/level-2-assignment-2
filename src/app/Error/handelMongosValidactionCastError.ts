import mongoose from 'mongoose';
import { TerrorSours, TGanaricErrorHandeler } from '../interface';

const handelMongosValidactionCastError = (
  err: mongoose.Error.CastError,
): TGanaricErrorHandeler => {
  const errorSource: TerrorSours = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  // handel error
  return {
    statusCod: 400,
    message: 'invalid object Id',
    errorSours: errorSource,
  };
};

export default handelMongosValidactionCastError;
