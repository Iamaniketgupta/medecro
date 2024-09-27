import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary, publicId } from '../utils/cloudinary.js';
import { User } from "../models/user.model.js";

const tempDoctorStore = {};

// Function to generate OTP

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

// Initiate doctor register endpoint
const initiateRegister = asyncHandler(async (req, res) => {
    const { name, speciality, gender, email, password, virtualFee, onsiteFee, experience, degrees } = req.body;


    if (!name || !speciality || !gender || !email || !password || !virtualFee || !onsiteFee || experience === undefined || !degrees) {
        throw new ApiError(400, "All fields are required");
    }

    const otp = generateOTP(4);
    tempDoctorStore[email] = { name, speciality, gender, email, password, virtualFee, onsiteFee, experience, degrees, otp };

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

    const tempDoctor = tempDoctorStore[email];

    if (!tempDoctor || tempDoctor.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    const { name, speciality, gender, password, virtualFee, onsiteFee, experience, degrees } = tempDoctor;
    const doctor = await Doctor.create({ name, speciality, gender, email, password, virtualFee, onsiteFee, experience, degrees });

    // Generate tokens
    const accessToken = doctor.generateAccessToken();
    const refreshToken = doctor.generateRefreshToken();

    // Save refreshToken to doctor document
    doctor.refreshToken = refreshToken;
    await doctor.save();

    delete tempDoctorStore[email];

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 3600 * 1000, // 1 hour in milliseconds
        sameSite: 'none',
        domain: 'http://localhost:5173',
    });

    res.status(200).json(new ApiResponse(200, { doctor, accessToken }, "Doctor registered successfully"));
});

// Doctor login endpoint
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
        throw new ApiError(400, "Doctor doesn't exist");
    }

    const isPasswordMatch = await doctor.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(400, "Wrong password");
    }

    // Generate tokens
    const accessToken = doctor.generateAccessToken();
    const refreshToken = doctor.generateRefreshToken();

    // Save refreshToken to doctor document
    doctor.refreshToken = refreshToken;
    await doctor.save();

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

    res.status(200).json(new ApiResponse(200, { doctor, accessToken, refreshToken }, "Doctor logged in successfully"));
});

// Controller to refresh tokens
const getRefreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token missing");
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const doctor = await Doctor.findById(decoded._id);

        if (!doctor) {
            throw new ApiError(404, "Doctor not found");
        }

        // Generate new tokens
        const newAccessToken = doctor.generateAccessToken();
        const newRefreshToken = doctor.generateRefreshToken();

        // Save new refresh token to doctor document
        doctor.refreshToken = newRefreshToken;
        await doctor.save();

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
    const doctorId = req.user._id;
    const file = req.file;

    if (!file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
        throw new ApiError(404, 'Doctor not found');
    }

    if (doctor.avatar) {
        const existingPublicId = await publicId(doctor.avatar);
        await deleteFromCloudinary(existingPublicId);
    }

    const uploadResponse = await uploadToCloudinary(file.path);
    if (!uploadResponse) {
        throw new ApiError(500, 'Failed to upload image');
    }

    doctor.avatar = uploadResponse.secure_url;
    await doctor.save();

    res.status(200).json(new ApiResponse(200, doctor, 'Avatar updated successfully'));
});

const getPatients = asyncHandler(async (req, res) => {
    const doctorId = req.user._id;

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new ApiError(404, 'Doctor not found');
    }

    // Find patients where the doctor's ID is in the 'doctors' array
    const patients = await User.find({ doctors: { $in: [doctor._id] } });

    res.status(200).json(new ApiResponse(200, patients, 'Patients retrieved successfully'));
});

const getDoctorById = asyncHandler(async (req, res) => {
    const {doctorId} = req.params;
    const doctor = await Doctor.findById(doctorId); // Replace 'doctorId' with the actual ID of the doctor you want to retrieve     

    if (!doctor) {
        throw new ApiError(404, 'Doctor not found');
    }

    res.status(200).json(new ApiResponse(200, doctor, 'Doctor retrieved successfully'));
});


const getdoctor = asyncHandler(async(req,res)=>{
    const user  = req.user;
    if(!user){  
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200 , user , "doctor dounf successfullty"))
})

export {
    initiateRegister,
    verifyOtp,
    login,
    getRefreshToken,
    updateAvatar,
    getPatients,
    getDoctorById,
    getdoctor
};
