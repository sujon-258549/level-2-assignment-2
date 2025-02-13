"use strict";
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handelZodError_1 = __importDefault(require("./handelZodError"));
const handelMongosValidactionError_1 = __importDefault(require("./handelMongosValidactionError"));
const handelMongosValidactionCastError_1 = __importDefault(require("./handelMongosValidactionCastError"));
const appError_1 = __importDefault(require("./appError"));
const handelMongosValidactionUnicIdError_1 = __importDefault(require("./handelMongosValidactionUnicIdError"));
const globalErrorHandler = (error, req, res, next) => {
    console.log(error);
    let statusCod = 500;
    let message = error.message || 'Something went wrong.';
    let errorSourse = [
        {
            path: '',
            message: error.message || 'Something went wrong.',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const zodErrorDetail = (0, handelZodError_1.default)(error);
        statusCod = zodErrorDetail.statusCod;
        message = zodErrorDetail.message;
        errorSourse = zodErrorDetail.errorSours;
    }
    else if (error.name === 'ValidationError') {
        const mongoseValidactionErrorDetail = (0, handelMongosValidactionError_1.default)(error);
        statusCod = mongoseValidactionErrorDetail.statusCod;
        message = mongoseValidactionErrorDetail.message;
        errorSourse = mongoseValidactionErrorDetail.errorSours;
    }
    else if (error.name === 'CastError') {
        const simplifiedError = (0, handelMongosValidactionCastError_1.default)(error);
        statusCod = simplifiedError.statusCod;
        message = simplifiedError.message;
        errorSourse = simplifiedError.errorSours;
    }
    else if (error.cod === 11000) {
        const simplefideError = (0, handelMongosValidactionUnicIdError_1.default)(error);
        statusCod = simplefideError.statusCod;
        message = simplefideError.message;
        errorSourse = simplefideError.errorSours;
    }
    else if (error instanceof appError_1.default) {
        statusCod = error.StatusCod;
        message = error.message;
        errorSourse = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSourse = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    res.status(statusCod).json({
        success: false,
        message,
        errorSourse,
        error,
        // stack: config.NODE_ENV === 'development' ? error?.stack : null,
    });
};
exports.default = globalErrorHandler;
