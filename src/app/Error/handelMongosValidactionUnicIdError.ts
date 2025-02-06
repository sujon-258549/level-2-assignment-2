import { TerrorSours, TGanaricErrorHandeler } from '../interface';

const handleMongooseValidationUniqueIdError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
): TGanaricErrorHandeler => {
  const match = err.message.match(/dup key: { name: "(.*?)" }/);
  const errormessage = match ? match[1] : null;
  const errorsource: TerrorSours = [
    {
      path: '',
      message: errormessage,
    },
  ];
  return {
    statusCod: 400,
    message: 'Validation error occurred.',
    errorSours: errorsource,
  };
};

export default handleMongooseValidationUniqueIdError;
