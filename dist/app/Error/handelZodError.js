"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelZodError = (zodError) => {
    const formetedError = zodError.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1] || 'unknown',
        message: issue.message,
    }));
    return {
        statusCod: 400,
        message: 'Validation error occurred.',
        errorSours: formetedError,
    };
};
exports.default = handelZodError;
