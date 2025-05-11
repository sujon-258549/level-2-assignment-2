"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const contactUs_services_1 = require("./contactUs.services");
const sendSuccess_1 = require("../../utility/sendSuccess");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const createContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield contactUs_services_1.contactServices.createContactIntoDB(req.body);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Contact created successfully',
        data: result,
    });
}));
const singleContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield contactUs_services_1.contactServices.singleContactIntoDB(id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Contact created successfully',
        data: result,
    });
}));
const contactForMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_services_1.contactServices.contactForMeIntoDB(req.query);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Contact created successfully',
        meta: result.meta,
        data: result.data,
    });
}));
exports.contactController = { createContact, singleContact, contactForMe };
