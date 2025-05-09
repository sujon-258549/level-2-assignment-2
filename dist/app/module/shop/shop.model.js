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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarShop = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const carShopSchema = new mongoose_1.Schema({
    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    authorShopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User',
    },
    shopAddress: { type: String, required: true },
    description: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    customerServiceContact: { type: String },
    website: { type: String },
    establishedYear: { type: String, required: true },
    socialMediaLinks: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
    },
    operatingHours: {
        open: { type: String, required: true },
        close: { type: String, required: true },
        daysOpen: { type: [String], required: true },
    },
    paymentMethods: { type: [String], required: true },
    carBrands: { type: [String], required: true }, // Changed from productCategories
    servicesOffered: { type: [String], required: true }, // New field for car shop
    shopFeatures: { type: [String], required: true },
    shopLogo: { type: String },
    serviceAreas: { type: [String] }, // New field for car shop
    certifications: { type: [String] }, // New field for car shop
    warrantyOffered: { type: Boolean, default: false }, // New field for car shop
    isActive: { type: Boolean, default: true },
});
// Create and export the model
exports.CarShop = mongoose_1.default.model('CarShop', carShopSchema);
