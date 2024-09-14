import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt"
// Doctor Schema
const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    virtualFee: { type: Number, required: true },
    onsiteFee: { type: Number, required: true },
    avatar:{type:String},
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


// Middleware to hash password before saving
doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Method to check if password is correct
  doctorSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  

// Method to generate access token for Doctor
doctorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      speciality: this.speciality,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token for Doctor
doctorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      speciality: this.speciality,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


// Exporting Doctor Model
export const Doctor = mongoose.model("Doctor", doctorSchema);
