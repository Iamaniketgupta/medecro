import { Chapter } from "../models/chapter.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";

// Create a new chapter
const createChapter = asyncHandler(async (req, res) => {
    const { title, content, choices=[] , story } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required");
    }

    const chapter = await Chapter.create({ title, content, choices ,story });
    res.status(201).json(new ApiResponse(201, chapter, "Chapter created successfully"));
});

// Get all chapters
const getAllChapters = asyncHandler(async (req, res) => {
    const chapters = await Chapter.find().populate("choices.branch", "title");
    res.status(200).json(new ApiResponse(200, chapters, "Chapters retrieved successfully"));
});

// Get chapter by ID
const getChapterById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid chapter ID");
    }

    const chapter = await Chapter.findById(id).populate("choices.branch", "title");
    if (!chapter) {
        throw new ApiError(404, "Chapter not found");
    }

    res.status(200).json(new ApiResponse(200, chapter, "Chapter retrieved successfully"));
});

// Update chapter by ID
const updateChapter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, choices } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid chapter ID");
    }

    const chapter = await Chapter.findByIdAndUpdate(
        id,
        { title, content, choices },
        { new: true, runValidators: true }
    );

    if (!chapter) {
        throw new ApiError(404, "Chapter not found");
    }

    res.status(200).json(new ApiResponse(200, chapter, "Chapter updated successfully"));
});

// Delete chapter by ID
const deleteChapter = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid chapter ID");
    }

    const chapter = await Chapter.findByIdAndDelete(id);

    if (!chapter) {
        throw new ApiError(404, "Chapter not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Chapter deleted successfully"));
});


// Get chapters by story ID
const getChaptersByStoryId = asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    if (!isValidObjectId(storyId)) {
        throw new ApiError(400, "Invalid story ID");
    }

    const chapters = await Chapter.find({ story: storyId }).populate("choices.branch", "title");
    if (!chapters.length) {
        throw new ApiError(404, "No chapters found for this story");
    }

    res.status(200).json(new ApiResponse(200, chapters, "Chapters retrieved successfully"));
});


export {
    createChapter,
    getAllChapters,
    getChapterById,
    updateChapter,
    deleteChapter,
    getChaptersByStoryId
};
