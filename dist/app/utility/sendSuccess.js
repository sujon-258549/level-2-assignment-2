"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = void 0;
const sendSuccess = (res, data) => {
    res.status(data.statusCod).json(Object.assign({ success: data.success, message: data.message, meta: data.meta }, (data.data !== undefined && { data: data.data })));
};
exports.sendSuccess = sendSuccess;
