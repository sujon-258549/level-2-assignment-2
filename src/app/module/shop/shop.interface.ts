import { Types } from 'mongoose';

export type TCarShop = {
  shopName: string;
  shopAddress: string;
  description: string;
  authorShopId: Types.ObjectId;
  shopLogo?: string;
  phoneNumber: string;
  website?: string;
  ownerName: string;
  establishedYear: string;
  carBrands: string[]; // Brands they sell/service
  servicesOffered: string[]; // e.g., sales, repairs, maintenance
  shopFeatures: string[]; // e.g., "24/7 service", "free inspection"
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  rating?: number;
  isActive: boolean;
  operatingHours: {
    open: string;
    close: string;
    daysOpen: string[];
  };
  paymentMethods: string[];
  customerServiceContact?: string;
  serviceAreas?: string[]; // Areas they serve
  certifications?: string[]; // Industry certifications
  warrantyOffered?: boolean;
};
