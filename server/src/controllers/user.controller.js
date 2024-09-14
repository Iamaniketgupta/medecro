import cookieParser from "cookie-parser";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
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

// Initiate register endpoint
const initiateRegister = asyncHandler(async (req, res) => {
  
    const {  email, password, fullName , role } = req.body;
    if ( !email  || !fullName || !role ) {
        throw new ApiError(400, "All fields are required");
    }

    const otp = generateOTP(4);
    tempUserStore[email] = { username:`${email.split('@')[0]}`, email, password, fullName, otp , role };

    const mailOptions = {
        from: process.env.EMAIL, // Replace with your email
        to: email,
        subject: `Hello! ${fullName}, It's a verification mail`,
        html: `<strong>Your OTP code is: ${otp}</strong>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json(new ApiResponse(200, email, "OTP sent successfully"));
    } catch (error) {
        throw new ApiError(500, `Error while sending OTP ${error}`);
    }
});

// Verify OTP endpoint
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
// console.log(email,otp)
    if (!email || !otp) {
        throw new ApiError(400, "All fields are required");
    }

    const tempUser = tempUserStore[email];

    if (!tempUser || tempUser.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    const { username, password, fullName , role } = tempUser;
    const user = await User.create({ username, email, password, fullName , role });

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

    res.status(200).json(new ApiResponse(200, { user, accessToken, refreshToken }, "User registered successfully"));
});

// Login endpoint
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({
        email
    });

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
        maxAge: 1000 * 60 * 60, // 1 hour
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.status(200).json(
        new ApiResponse(
            200,
            { user, accessToken, refreshToken },
            "User login successfully"
        )
    );
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
            maxAge: 3600 * 1000, // 1 hour
            sameSite: 'none',
        });
        
        res.status(200).json(new ApiResponse(200, { accessToken: newAccessToken, refreshToken: newRefreshToken }, "Tokens refreshed successfully"));
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token");
    }
});

// Update profile picture
const updateProfilePicture = asyncHandler(async (req, res) => {
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

    res.status(200).json(new ApiResponse(200, user, 'Profile picture updated successfully'));
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'User ID is required');
    }

    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
});

// Get current authenticated user
const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "Not authenticated");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User fetched successfully"
        )
    );
});

export {
    initiateRegister,
    login,
    verifyOtp,
    getRefreshToken,
    updateProfilePicture,
    getUserById,
    getUser
};
