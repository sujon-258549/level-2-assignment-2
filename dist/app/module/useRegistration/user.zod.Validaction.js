"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginZodValidation = void 0;
const zod_1 = require("zod");
exports.loginZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string().min(1, 'Password must be at least 1 characters long'),
    }),
});
exports.default = exports.loginZodValidation;
