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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/* eslint-disable no-useless-escape */
const mongoose_1 = require("mongoose");
const argon2 = __importStar(require("argon2"));
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
        this.password = yield argon2.hash(this.password);
    });
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
