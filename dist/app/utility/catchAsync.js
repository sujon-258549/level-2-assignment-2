"use strict";
// import { NextFunction, Request, RequestHandler, Response } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => {
//       console.error(error); // Log the error for debugging
//       next(error); // Pass the error to the next middleware (error handler)
//     });
//   };
// };
// export default catchAsync;
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            next(error);
        });
    };
};
exports.default = catchAsync;
