"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendSuccess_1 = require("../utility/sendSuccess");
const http_status_1 = __importDefault(require("http-status"));
const notFound = (req, res, next) => {
    const statusCod = 500;
    const message = 'Router is Notfound!';
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Please enter the correct route.',
    });
};
exports.default = notFound;
