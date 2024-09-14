import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";

// Create a new comment
const createComment = asyncHandler(async (req, res) => {
    const { content, story } = req.body;
    const author = req.user._id; // Assuming user is attached to req object by authentication middleware

    if (!content || !story) {
        throw new ApiError(400, "Content and story ID are required");
    }

    if (!isValidObjectId(story)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const comment = await Comment.create({ content, story, author });
    res.status(201).json(new ApiResponse(201, comment, "Comment created successfully"));
});

// Get all comments for a story
const getCommentsForStory = asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    if (!isValidObjectId(storyId)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const comments = await Comment.find({ story: storyId }).populate("author").sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

// Get a comment by ID
const getCommentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findById(id).populate("author");
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    res.status(200).json(new ApiResponse(200, comment, "Comment retrieved successfully"));
});

// Update a comment by ID
const updateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true, runValidators: true }
    );

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    res.status(200).json(new ApiResponse(200, comment, "Comment updated successfully"));
});

// Delete a comment by ID
const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export {
    createComment,
    getCommentsForStory,
    getCommentById,
    updateComment,
    deleteComment
};
