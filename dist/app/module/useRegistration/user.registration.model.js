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
exports.UserModel = void 0;
/* eslint-disable no-useless-escape */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const addressSchema = new mongoose_1.Schema({
    street: { type: String, required: true, trim: true },
    street2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    district: { type: String, required: true, trim: true }, // জেলা
    subdistrict: { type: String, trim: true }, // উপজেলা/Thana
    village: { type: String, trim: true }, // গ্রাম
    union: { type: String, trim: true }, // ইউনিয়ন
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true }, // ISO code (e.g., "BD", "US")
    isDefault: { type: Boolean, default: false },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    profileImage: { type: String },
    isShop: { type: Boolean, default: false },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Store emails in lowercase
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Invalid email format',
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'guest'],
        default: 'user',
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => /^\+?[0-9\s\-\(\)]{10,20}$/.test(value),
            message: 'Invalid phone number format',
        },
    },
    isActive: { type: Boolean, default: true },
    birthDate: { type: String },
    address: addressSchema, // Embedded address subdocument
}, {
    timestamps: true, // Adds createdAt and updatedAt
});
// Middleware to hash password before saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 8); // Use bcrypt or similar
    });
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
