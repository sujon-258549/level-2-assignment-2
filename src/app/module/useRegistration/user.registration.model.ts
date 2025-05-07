/* eslint-disable no-useless-escape */
import { Schema, model } from 'mongoose';
import { TUserRegistration } from './user.registration.interface';
import bcrypt from 'bcrypt';
const addressSchema = new Schema(
  {
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
  },
  { _id: false }, // Prevents Mongoose from creating an _id for subdocuments
);

const userSchema = new Schema<TUserRegistration>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    profileImage: { type: String },
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
        validator: (value: string) => /^\+?[0-9\s\-\(\)]{10,20}$/.test(value),
        message: 'Invalid phone number format',
      },
    },
    isActive: { type: Boolean, default: true },
    birthDate: { type: String },
    address: addressSchema, // Embedded address subdocument
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);
// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8); // Use bcrypt or similar
});
export const UserModel = model<TUserRegistration>('User', userSchema);
