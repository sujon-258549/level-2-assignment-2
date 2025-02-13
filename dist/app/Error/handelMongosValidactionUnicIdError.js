"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseValidationUniqueIdError = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
err) => {
    const match = err.message.match(/dup key: { name: "(.*?)" }/);
    const errormessage = match ? match[1] : null;
    const errorsource = [
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
exports.default = handleMongooseValidationUniqueIdError;
