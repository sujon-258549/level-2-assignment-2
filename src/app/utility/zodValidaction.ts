// import { AnyZodObject } from 'zod';
// import { NextFunction, Request, Response } from 'express';
// import catchAsync from './catchAsync';

import { AnyZodObject } from 'zod';
import catchAsync from './catchAsync';
import { NextFunction, Request, Response } from 'express';

// const zodValidaction = (schema: AnyZodObject) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     await schema.parseAsync({
//       body: req.body,
//     });
//     next();
//   });
// };

// export default zodValidaction;

const zodValidation = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default zodValidation;
