// import { NextFunction, Request, RequestHandler, Response } from 'express';

import { NextFunction, Request, RequestHandler, Response } from 'express';

// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => {
//       console.error(error); // Log the error for debugging
//       next(error); // Pass the error to the next middleware (error handler)
//     });
//   };
// };

// export default catchAsync;

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export default catchAsync;
