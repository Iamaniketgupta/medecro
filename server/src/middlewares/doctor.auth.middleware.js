import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.model.js";

export const verifyJwtForDoctor = asyncHandler(async( req , res, next)=>{
    try {
        
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer " , "") || req.body.token || req.body.headers?.Authorization?.replace("Bearer " , "");
        console.log({token})
    
        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }

        console.log( process.env.ACCESS_TOKEN_SECRET)
    
        const decodedToken = await jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);


    
        const  user = await Doctor.findById(decodedToken._id).select("-password -refreshToken");

        
        if(!user){
            throw new ApiError(401, "Invalid token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }

})