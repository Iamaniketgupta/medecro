import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary, publicId } from '../utils/cloudinary.js';

const tempUserStore = {};

// Function to generate OTP
function generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

// Nodemailer setup
console.log(process.env.EMAIL);
console.log(process.env.PASSWORD)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Replace with your email
        pass: process.env.PASSWORD, // Replace with your email password
    },
    tls: {
        rejectUnauthorized: false // Disable strict SSL verification
    }
});

// Initiate user register endpoint
const initiateRegister = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { mobileNo, email, name, age, password } = req.body;
    if (!mobileNo || !email || !name || !age || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const otp = generateOTP(4);
    tempUserStore[email] = { mobileNo, email, name, age, password, otp };

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Hello! ${name}, It's a verification mail`,
        html: `<strong>Your OTP code is: ${otp}</strong>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json(new ApiResponse(200, email, "OTP sent successfully"));
    } catch (error) {
        throw new ApiError(500, `Error while sending OTP: ${error.message}`);
    }
});

// Verify OTP endpoint
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;


    if (!email || !otp) {
        throw new ApiError(400, "All fields are required");
    }

    const tempUser = tempUserStore[email];

    if (!tempUser || tempUser.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    const { mobileNo, name, age, address, password } = tempUser;

    const user = await User.create({
        mobileNo,
        email,
        name,
        age,
        address,
        password
    });

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refreshToken to user document
    user.refreshToken = refreshToken;
    await user.save();

    delete tempUserStore[email];

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 3600 * 1000, // 1 hour in milliseconds
        sameSite: 'none',
        domain: 'http://localhost:5173',
    });

    res.status(200).json(new ApiResponse(200, { user, accessToken }, "User registered successfully"));
});

// User login endpoint
const login = asyncHandler(async (req, res) => {
    console.log("reacged")
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User doesn't exist");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(400, "Wrong password");
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refreshToken to user document
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 // 1 hour in milliseconds
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 // 1 hour in milliseconds
    });

    res.status(200).json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully"));
});

// Controller to refresh tokens
const getRefreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token missing");
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Generate new tokens
        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        // Save new refresh token to user document
        user.refreshToken = newRefreshToken;
        await user.save();

        // Set cookies with new tokens
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            maxAge: 3600 * 1000, // 1 hour in milliseconds
            sameSite: 'none',
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 3600 * 1000, // 1 hour in milliseconds
            sameSite: 'none',
        });

        res.status(200).json(new ApiResponse(200, { accessToken: newAccessToken, refreshToken: newRefreshToken }, "Tokens refreshed successfully"));
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token");
    }
});

// Controller to update avatar
const updateAvatar = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if (user.avatar) {
        const existingPublicId = await publicId(user.avatar);
        await deleteFromCloudinary(existingPublicId);
    }

    const uploadResponse = await uploadToCloudinary(file.path);
    if (!uploadResponse) {
        throw new ApiError(500, 'Failed to upload image');
    }

    user.avatar = uploadResponse.secure_url;
    await user.save();

    res.status(200).json(new ApiResponse(200, user, 'Avatar updated successfully'));
});

// Associate a doctor with a user
const addDoctorToUser = asyncHandler(async (req, res) => {
    const { userId, doctorId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    if (!user.doctors.includes(doctorId)) {
        user.doctors.push(doctorId);
        await user.save();
    }

    res.status(200).json(new ApiResponse(200, user, "Doctor added to user successfully"));
});

// Remove a doctor from a user
const removeDoctorFromUser = asyncHandler(async (req, res) => {
    const { userId, doctorId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.doctors = user.doctors.filter((docId) => docId.toString() !== doctorId);
    await user.save();

    res.status(200).json(new ApiResponse(200, user, "Doctor removed from user successfully"));
});

const getuserbyid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user, "User found successfully"));
});

export {
    initiateRegister,
    verifyOtp,
    login,
    getRefreshToken,
    updateAvatar,
    addDoctorToUser,
    removeDoctorFromUser,
    getuserbyid
};
