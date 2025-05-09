"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    // Basic Identification
    brand: {
        type: String,
        enum: ['Toyota', 'BMW', 'Ford', 'Honda', 'Mercedes', 'Audi', 'Tesla'],
        required: [true, 'Brand is required'],
    },
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true,
    },
    offerDateAndTime: {
        type: String || Date,
    },
    trim: String,
    generation: String,
    // Visuals
    image: {
        type: mongoose_1.Schema.Types.Mixed, // Can be string or array of strings
        required: [true, 'Image is required'],
    },
    color: {
        type: [String],
        required: [true, 'Color is required'],
    },
    // Specifications
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1900, 'Year must be after 1900'],
        max: [new Date().getFullYear() + 1, `Year can't be in the future`],
    },
    mileage: {
        type: Number,
        min: [0, 'Mileage must be positive'],
    },
    bodyType: {
        type: String,
        enum: [
            'Sedan',
            'SUV',
            'Truck',
            'Coupe',
            'Convertible',
            'Hatchback',
            'Minivan',
            'Wagon',
        ],
        required: [true, 'Body type is required'],
    },
    seatingCapacity: {
        type: Number,
        required: [true, 'Seating capacity is required'],
        min: [1, 'Must have at least 1 seat'],
    },
    doors: {
        type: Number,
        required: [true, 'Number of doors is required'],
        min: [1, 'Must have at least 1 door'],
    },
    drivetrain: {
        type: String,
        enum: ['FWD', 'RWD', 'AWD', '4WD'],
        required: [true, 'Drivetrain is required'],
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Manual', 'CVT', 'DCT'],
        required: [true, 'Transmission is required'],
    },
    fuelType: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', ' Hybrid'],
        required: [true, 'Fuel type is required'],
    },
    engine: {
        size: String,
        cylinders: Number,
        horsepower: Number,
        torque: Number,
        fuelEconomy: {
            city: Number,
            highway: Number,
            combined: Number,
        },
    },
    batteryCapacity: Number,
    range: Number,
    // Features
    features: {
        interior: [String],
        exterior: [String],
        safety: [String],
        infotainment: [String],
    },
    // Pricing
    price: {
        type: Number,
    },
    originalPrice: Number,
    currency: {
        type: String,
        default: 'USD',
    },
    leaseOptions: {
        monthlyPayment: Number,
        term: Number,
        downPayment: Number,
    },
    // Inventory
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be positive'],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    isOffer: {
        type: Boolean,
        default: false,
    },
    stockNumber: { type: String },
    vin: {
        type: String,
        sparse: true,
    },
    condition: {
        type: String,
        enum: ['New', 'Used', 'Certified Pre-Owned'],
        required: [true, 'Condition is required'],
    },
    // Additional Info
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
    },
    reviewCount: Number,
    warranty: {
        type: {
            type: String,
            required: false,
        },
        months: {
            type: Number,
            required: false,
        },
        miles: {
            type: Number,
            required: false,
        },
    },
}, {
    timestamps: true,
});
carSchema.virtual('fullModelName').get(function () {
    return `${this.brand} ${this.model}${this.trim ? ' ' + this.trim : ''}`;
});
// Formatted price (e.g., "$45,990")
carSchema.virtual('formattedPrice').get(function () {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.currency || 'USD',
    }).format(this.price);
});
// Is electric vehicle
carSchema.virtual('isElectric').get(function () {
    return this.fuelType === 'Electric' || this.fuelType === 'Plug-in Hybrid';
});
// Age of the car in years
carSchema.virtual('age').get(function () {
    return new Date().getFullYear() - this.year;
});
// Indexes for better query performance
carSchema.index({ brand: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ isFeatured: 1 });
carSchema.index({ isHotDeal: 1 });
carSchema.pre('save', function (next) {
    this.inStock = this.quantity > 0;
    next();
});
exports.CarModel = (0, mongoose_1.model)('Car', carSchema);
