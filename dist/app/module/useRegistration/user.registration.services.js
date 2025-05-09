"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userRegistrationServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const appError_1 = __importDefault(require("../../Error/appError"));
const user_registration_model_1 = require("./user.registration.model");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2 = __importStar(require("argon2"));
const config_1 = __importDefault(require("../../config"));
const utils_1 = require("./utils");
const builder_1 = __importDefault(require("../../builder/builder"));
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const searchBleFild = ['name', 'email'];
// create user
const createdUser = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(file, payload);
    if (file) {
        const path = file.path;
        const name = payload.firstName.replace(/\s+/g, '_').toLowerCase();
        const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, path));
        payload.profileImage = secure_url;
    }
    const result = yield user_registration_model_1.UserModel.create(payload);
    return result;
});
// login user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const existingUser = yield user_registration_model_1.UserModel.findOne({ email });
    if (!existingUser) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User with this email does not exist.');
    }
    const matchpassword = yield argon2.verify(existingUser === null || existingUser === void 0 ? void 0 : existingUser.password, password);
    if (!matchpassword) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User with this password does not exist.');
    }
    const JwtPayload = {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser._id,
    };
    const token = (0, utils_1.createToken)(JwtPayload, config_1.default.JWT_ACCESS_TOKEN, config_1.default.JWT_ACCESS_TOKEN_EXPIRE_IN_ACCESSION);
    return {
        token,
    };
});
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCar = new builder_1.default(user_registration_model_1.UserModel.find({ role: 'user' }), query)
        .search(searchBleFild)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield orderCar.countTotal();
    const data = yield orderCar.modelQuery;
    return { meta, data };
});
const getOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_registration_model_1.UserModel.findById(id);
    return result;
});
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const result = yield user_registration_model_1.UserModel.findOne({ email: user.email });
    return result;
});
const changePassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload, token });
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_ACCESS_TOKEN);
    if (!decoded) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
    }
    const { email } = decoded;
    const exisEmail = yield user_registration_model_1.UserModel.findOne({ email: email });
    if (!exisEmail) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid Email');
    }
    const password = payload === null || payload === void 0 ? void 0 : payload.oldPassword;
    const hasPasswordData = exisEmail.password;
    const comparePassword = yield argon2.verify(hasPasswordData, password);
    if (!comparePassword) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Insurrect old Password');
    }
    const newPassword = yield argon2.hash(payload.newPassword);
    const result = yield user_registration_model_1.UserModel.findOneAndUpdate({ email: exisEmail === null || exisEmail === void 0 ? void 0 : exisEmail.email }, { password: newPassword });
    return result;
});
const updateMe = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const path = file.path;
        const name = payload.firstName;
        const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, path));
        payload.profileImage = secure_url;
    }
    const result = yield user_registration_model_1.UserModel.findOneAndUpdate({ email: user.email }, payload);
    return result;
});
exports.userRegistrationServices = {
    createdUser,
    loginUser,
    getAllUser,
    getOneUser,
    changePassword,
    getMe,
    updateMe,
};
