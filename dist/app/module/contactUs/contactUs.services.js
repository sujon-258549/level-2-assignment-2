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
exports.contactServices = void 0;
const contactUs_model_1 = __importDefault(require("./contactUs.model"));
const builder_1 = __importDefault(require("../../builder/builder"));
const createContactIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newContact = yield contactUs_model_1.default.create(userData); // Changed variable name for clarity
    return newContact;
});
const contactForMeIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new builder_1.default(contactUs_model_1.default.find(), query)
        .sort()
        .fields()
        .filter()
        .search(['name', 'email', 'address', 'phone']);
    const meta = yield newUser.countTotal();
    const data = yield newUser.modelQuery;
    return { meta, data };
});
const singleContactIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield contactUs_model_1.default.findById(id);
    return newUser;
});
exports.contactServices = {
    createContactIntoDB,
    contactForMeIntoDB,
    singleContactIntoDB,
};
