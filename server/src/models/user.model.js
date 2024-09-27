import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";
// User Schema
const userSchema = new Schema(
  {
    mobileNo: { type: String },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    emergencyno: { type: String },
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    avatar: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);



// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


// Exporting User Model
export const User = mongoose.model("User", userSchema);
