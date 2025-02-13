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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistrationController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendSuccess_1 = require("../../utility/sendSuccess");
const http_status_1 = __importDefault(require("http-status"));
const user_registration_services_1 = require("./user.registration.services");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield user_registration_services_1.userRegistrationServices.createdUser(data);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.CREATED,
        success: true,
        message: 'User Registered successfully',
        data: result,
    });
}));
const findAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield user_registration_services_1.userRegistrationServices.getAllUser(query);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'All User retrieved successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result,
    });
}));
const findOneUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_registration_services_1.userRegistrationServices.getOneUser(id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield user_registration_services_1.userRegistrationServices.loginUser(data);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'User Login successfully',
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    const result = yield user_registration_services_1.userRegistrationServices.changePassword(req.headers.authorization, passwordData);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.CREATED,
        success: true,
        message: 'Cheng password is success',
        data: result,
    });
}));
exports.userRegistrationController = {
    createUser,
    loginUser,
    findAllUser,
    findOneUser,
    changePassword,
};
