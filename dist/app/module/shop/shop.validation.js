"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealProviderValidations = void 0;
const zod_1 = require("zod");
// Social Media Links Schema
const socialMediaLinksSchema = zod_1.z
    .object({
    facebook: zod_1.z.string().url().optional(),
    instagram: zod_1.z.string().url().optional(),
    twitter: zod_1.z.string().url().optional(),
    linkedin: zod_1.z.string().url().optional(),
})
    .optional();
// Operating Hours Schema
const operatingHoursSchema = zod_1.z.object({
    open: zod_1.z.string().min(1, 'Opening time is required'),
    close: zod_1.z.string().min(1, 'Closing time is required'),
    daysOpen: zod_1.z
        .array(zod_1.z.string().min(1))
        .nonempty('At least one open day is required'),
});
// Main TMealProvider Schema
const createMealProviderSchema = zod_1.z.object({
    body: zod_1.z.object({
        shopName: zod_1.z.string().min(1, 'Shop name is required'),
        shopAddress: zod_1.z.string().min(1, 'Shop address is required'),
        shopLogo: zod_1.z.string().url().optional(),
        phoneNumber: zod_1.z.string().min(10, 'Phone number is required'),
        website: zod_1.z.string().url().optional(),
        ownerName: zod_1.z.string().min(1, 'Owner name is required'),
        establishedYear: zod_1.z.number().min(1900).max(new Date().getFullYear()),
        productCategories: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty('At least one category is required'),
        socialMediaLinks: socialMediaLinksSchema,
        operatingHours: operatingHoursSchema,
        paymentMethods: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty('At least one payment method is required'),
        customerServiceContact: zod_1.z.string().optional(),
    }),
});
// For UPDATE: All fields optional, but validated if provided
const updateMealProviderSchema = zod_1.z.object({
    body: zod_1.z.object({
        shopName: zod_1.z.string().min(1).optional(),
        shopAddress: zod_1.z.string().min(1).optional(),
        shopLogo: zod_1.z.string().url().optional(),
        phoneNumber: zod_1.z.string().min(10).optional(),
        website: zod_1.z.string().url().optional(),
        ownerName: zod_1.z.string().min(1).optional(),
        establishedYear: zod_1.z
            .number()
            .min(1900)
            .max(new Date().getFullYear())
            .optional(),
        productCategories: zod_1.z.array(zod_1.z.string().min(1)).optional(),
        socialMediaLinks: socialMediaLinksSchema,
        operatingHours: operatingHoursSchema.partial().optional(), // allow partial updates
        paymentMethods: zod_1.z.array(zod_1.z.string().min(1)).optional(),
        customerServiceContact: zod_1.z.string().optional(),
    }),
});
exports.mealProviderValidations = {
    createMealProviderSchema,
    updateMealProviderSchema,
};
