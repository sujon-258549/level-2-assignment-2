"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true }, // Store hashed password
}, { timestamps: true });
// Create the Mongoose model
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
