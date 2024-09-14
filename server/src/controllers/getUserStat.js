import { User } from "../models/user.model";
import { Comment } from "../models/comment.model"; // Assuming Comment is defined in this model
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse"; // Assuming you have an ApiResponse utility

export const getUserStats = asyncHandler(async (req, res) => {
    
    // const author = req.user._id; 

    // const comments = await Comment.find({ author });

    // const user = await User.findById(author).populate('likes');

    // const views = await Comment.countDocuments({ author }); 

    // res.status(201).json(new ApiResponse(201, { likes: user.likes, comments, views }, "Comment created successfully"));
});
