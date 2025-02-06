import mongoose from 'mongoose';
import { TerrorSours, TGanaricErrorHandeler } from '../interface';

const handelMongosValidactionError = (
  err: mongoose.Error.ValidationError,
): TGanaricErrorHandeler => {
  const errorSours: TerrorSours = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: val.path,
      message: val.message,
    }),
  );
  return {
    statusCod: 400,
    message: 'Validation error occurred.',
    errorSours,
  };
};

export default handelMongosValidactionError;
