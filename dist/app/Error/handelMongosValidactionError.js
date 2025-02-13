"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelMongosValidactionError = (err) => {
    const errorSours = Object.values(err.errors).map((val) => ({
        path: val.path,
        message: val.message,
    }));
    return {
        statusCod: 400,
        message: 'Validation error occurred.',
        errorSours,
    };
};
exports.default = handelMongosValidactionError;
