import { ZodError, ZodIssue } from 'zod';
import { TerrorSours, TGanaricErrorHandeler } from '../interface';

const handelZodError = (zodError: ZodError): TGanaricErrorHandeler => {
  const formetedError: TerrorSours = zodError.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1] || 'unknown',
    message: issue.message,
  }));
  return {
    statusCod: 400,
    message: 'Validation error occurred.',
    errorSours: formetedError,
  };
};

export default handelZodError;
