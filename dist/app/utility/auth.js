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
exports.userRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("./catchAsync"));
const appError_1 = __importDefault(require("../Error/appError"));
const config_1 = __importDefault(require("../config"));
const user_registration_model_1 = require("../module/useRegistration/user.registration.model");
exports.userRole = {
    user: 'user',
    admin: 'admin',
};
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
        }
        //   validation token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_TOKEN);
        if (!decoded) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
        }
        const { email, role } = decoded;
        const user = yield user_registration_model_1.UserModel.findOne({ email }).select('+password');
        if (!user) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
        }
        //   check is blocked user
        // if (user.isBlocked) {
        //   throw new AppError(httpStatus.UNAUTHORIZED, 'Your User is Blocked!');
        // }
        //   role check
        // Check for required roles
        console.log(requiredRoles, role);
        if (requiredRoles && !(requiredRoles === null || requiredRoles === void 0 ? void 0 : requiredRoles.includes(role))) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User does not have the required permissions');
        }
        req.user = decoded;
        // console.log(user);
        // console.log(decoded);
        next();
    }));
};
exports.default = auth;
