"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelMongosValidactionCastError = (err) => {
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCod: 400,
        message: 'invalid object Id',
        errorSours: errorSource,
    };
};
exports.default = handelMongosValidactionCastError;
