import { Story } from "../models/story.model.js";
import { Chapter } from "../models/chapter.model.js"; // Ensure you have this model
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create a new story
const createStory = asyncHandler(async (req, res) => {
    const { title, description, author, isPublished, theme } = req.body;

    if (!title || !description || !author) {
        throw new ApiError(400, "Title, description, and author are required");
    }

    let coverImage = null;
    let uploadResponse = null;

    if (req.file) {
        try {
            uploadResponse = await uploadToCloudinary(req.file.path);

            if (!uploadResponse || !uploadResponse.secure_url) {
                throw new ApiError(500, "Failed to upload image to Cloudinary");
            }

            coverImage = uploadResponse.secure_url;  
        } catch (error) {
            throw new ApiError(500, "Error during image upload");
        }
    }

    const story = await Story.create({
        title,
        description,
        author,
        isPublished: isPublished || false,
        theme,
        coverImage
    });

    res.status(201).json(new ApiResponse(201, story, "Story created successfully"));
});

// Get all stories
const getAllStories = asyncHandler(async (req, res) => {
    const stories = await Story.find().populate("author").populate("chapters").sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, stories, "Stories retrieved successfully"));
});

// Get a story by ID
const getStoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const story = await Story.findById(id).populate("author", "username").populate("chapters").populate("chapter");
    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    res.status(200).json(new ApiResponse(200, story, "Story retrieved successfully"));
});

// Update story by ID
const updateStory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, author, isPublished, theme } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const story = await Story.findByIdAndUpdate(
        id,
        { title, description, author, isPublished, theme },
        { new: true, runValidators: true }
    );

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    res.status(200).json(new ApiResponse(200, story, "Story updated successfully"));
});

// Delete story by ID
const deleteStory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const story = await Story.findByIdAndDelete(id);

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Story deleted successfully"));
});

// Update publication status
const updatePublicationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isPublished } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid story ID");
    }

    if (typeof isPublished !== 'boolean') {
        throw new ApiError(400, "Invalid value for isPublished, must be a boolean");
    }

    const story = await Story.findByIdAndUpdate(
        id,
        { isPublished },
        { new: true, runValidators: true }
    );

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    res.status(200).json(new ApiResponse(200, story, "Story publication status updated successfully"));
});

// Like a story by ID
const likeStory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Assuming user ID is available in req.user from authentication middleware

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid story ID");
    }

    // Find the story and check if the user has already liked it
    const story = await Story.findById(id);

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    if (story.likes.includes(userId)) {
        throw new ApiError(400, "You have already liked this story");
    }

    // Add the user ID to the likes array
    story.likes.push(userId);
    await story.save();

    res.status(200).json(new ApiResponse(200, story, "Story liked successfully"));
});

// Unlike a story by ID
const unlikeStory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Assuming user ID is available in req.user from authentication middleware

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid story ID");
    }

    // Find the story and check if the user has liked it
    const story = await Story.findById(id);

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    if (!story.likes.includes(userId)) {
        throw new ApiError(400, "You have not liked this story");
    }

    // Remove the user ID from the likes array
    story.likes.pull(userId);
    await story.save();

    res.status(200).json(new ApiResponse(200, story, "Story unliked successfully"));
});

// Add the first chapter to a story
const addChapterToStory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { chapterId } = req.body;

    if (!isValidObjectId(id) || !isValidObjectId(chapterId)) {
        throw new ApiError(400, "Invalid story or chapter ID");
    }

    // Find the story
    const story = await Story.findById(id);

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    // Check if the chapter is already added
    if (story.chapters.includes(chapterId)) {
        throw new ApiError(400, "Chapter already added to this story");
    }

    // Add chapter to the story's chapters array
    story.chapters.push(chapterId);
    await story.save();

    res.status(200).json(new ApiResponse(200, story, "Chapter added to story successfully"));
});


// Add the first chapter to a story
const addMainChapterToStory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { chapterId } = req.body;

    if (!isValidObjectId(id) || !isValidObjectId(chapterId)) {
        throw new ApiError(400, "Invalid story or chapter ID");
    }

    // Find the story
    const story = await Story.findById(id);

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    
    story.chapter = chapterId;
    await story.save();

    res.status(200).json(new ApiResponse(200, story, "Chapter added to story successfully"));
});


const getStoriesByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const stories = await Story.find({ author: userId }).populate("author").populate("chapters").sort({ createdAt: -1 });

    if (!stories.length) {
        throw new ApiError(404, "No stories found for this user");
    }

    res.status(200).json(new ApiResponse(200, stories, "Stories retrieved successfully"));
});

export {
    createStory,
    getAllStories,
    getStoryById,
    updateStory,
    deleteStory,
    updatePublicationStatus,
    likeStory,
    unlikeStory,
    addChapterToStory,
    addMainChapterToStory,
    getStoriesByUserId
};
