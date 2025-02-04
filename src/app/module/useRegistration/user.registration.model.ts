import { Schema, model } from 'mongoose';
import { TUserRegistration } from './user.registration.interface';

const userSchema = new Schema<TUserRegistration>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true }, // Store hashed password
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

// Create the Mongoose model
export const UserModel = model<TUserRegistration>('User', userSchema);
