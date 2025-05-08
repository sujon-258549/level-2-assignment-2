import { ObjectId } from 'mongoose';

export interface TCar {
  // Basic Identification
  id?: ObjectId;
  brand:
    | 'Toyota'
    | 'BMW'
    | 'Ford'
    | 'Honda'
    | 'Mercedes'
    | 'Audi'
    | 'Tesla'
    | string;
  model: string;
  trim?: string;
  generation?: string;

  // Visuals
  image: string | string[];
  color: string[];

  // Specifications
  year: number;
  mileage?: number;
  bodyType:
    | 'Sedan'
    | 'SUV'
    | 'Truck'
    | 'Coupe'
    | 'Convertible'
    | 'Hatchback'
    | 'Minivan'
    | 'Wagon';
  seatingCapacity: number;
  doors: number;
  drivetrain: 'FWD' | 'RWD' | 'AWD' | '4WD';
  transmission: 'Automatic' | 'Manual' | 'CVT' | 'DCT';
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Plug-in Hybrid';
  engine?: {
    size: string;
    cylinders: number;
    horsepower: number;
    torque: number;
    fuelEconomy?: {
      city: number;
      highway: number;
      combined: number;
    };
  };
  batteryCapacity?: number;
  range?: number;

  // Features
  features: {
    interior?: string[];
    exterior?: string[];
    safety?: string[];
    infotainment?: string[];
  };

  // Pricing
  price: number;
  originalPrice?: number;
  currency?: string;
  leaseOptions?: {
    monthlyPayment: number;
    term: number;
    downPayment: number;
  };

  // Inventory
  quantity: number;
  inStock: boolean;
  offerDateAndTime: Date | string;
  stockNumber?: string;
  vin?: string;
  condition: 'New' | 'Used' | 'Certified Pre-Owned';

  // Additional Info
  description: string;
  rating?: number;
  reviewCount?: number;
  warranty?: {
    type: string;
    months: number;
    miles: number;
  };
}
