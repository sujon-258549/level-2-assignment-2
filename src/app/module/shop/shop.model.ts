import mongoose, { Schema } from 'mongoose';
import { TCarShop } from './shop.interface';

const carShopSchema = new Schema<TCarShop>({
  shopName: { type: String, required: true },
  ownerName: { type: String, required: true },
  authorShopId: {
    type: Schema.Types.ObjectId,
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
export const CarShop = mongoose.model<TCarShop>('CarShop', carShopSchema);
