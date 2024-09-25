import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";

export const verifyJwtForDoctor = asyncHandler(async( req , res, next)=>{
    try {
        
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer " , "") || req.body.token || req.body.headers?.Authorization?.replace("Bearer " , "");
    
        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }

        console.log({token})
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

        console.log({decodedToken})
    
        const  user = await Doctor.findById(decodedToken._id).select("-password -refreshToken");

        // console.log(user)
    
        if(!user){
            throw new ApiError(401, "Invalid token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }

})