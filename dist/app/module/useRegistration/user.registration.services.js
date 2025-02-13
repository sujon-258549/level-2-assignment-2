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
exports.userRegistrationServices = void 0;
const appError_1 = __importDefault(require("../../Error/appError"));
const user_registration_model_1 = require("./user.registration.model");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const utils_1 = require("./utils");
const builder_1 = __importDefault(require("../../builder/builder"));
const searchBleFild = ['name', 'email'];
// create user
const createdUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = payload.password;
    const haspassword = yield bcrypt_1.default.hash(password, 5);
    console.log(haspassword);
    const result = yield user_registration_model_1.UserModel.create(Object.assign(Object.assign({}, payload), { password: haspassword }));
    return result;
});
// login user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const existingUser = yield user_registration_model_1.UserModel.findOne({ email });
    if (!existingUser) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User with this email does not exist.');
    }
    const matchpassword = yield bcrypt_1.default.compare(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
    if (!matchpassword) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'User with this password does not exist.');
    }
    const JwtPayload = {
        email: existingUser.email,
        role: existingUser.role,
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
const getOneUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_registration_model_1.UserModel.findOne({ email: _id });
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
    const comparePassword = yield bcrypt_1.default.compare(password, hasPasswordData);
    if (!comparePassword) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Insurrect old Password');
    }
    const newPassword = yield bcrypt_1.default.hash(payload.newPassword, 5);
    const result = yield user_registration_model_1.UserModel.findOneAndUpdate({ email: exisEmail === null || exisEmail === void 0 ? void 0 : exisEmail.email }, { password: newPassword });
    return result;
});
exports.userRegistrationServices = {
    createdUser,
    loginUser,
    getAllUser,
    getOneUser,
    changePassword,
};
