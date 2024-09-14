import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Branch from "../models/branch.model.js";

// Create a new Branch
const createBranch = asyncHandler(async (req, res) => {
    const { fromChapter, toChapter, condition } = req.body;

    if (!fromChapter || !toChapter || !condition) {
        throw new ApiError(400, "All fields are required");
    }

    if (!isValidObjectId(fromChapter) || !isValidObjectId(toChapter)) {
        throw new ApiError(400, "Invalid chapter IDs");
    }

    const newBranch = await Branch.create({
        fromChapter,
        toChapter,
        condition,
    });

    res.status(201).json(new ApiResponse(201, newBranch, "Branch created successfully"));
});

// Get all Branches
const getAllBranches = asyncHandler(async (req, res) => {
    const branches = await Branch.find()
        .populate("fromChapter")
        .populate("toChapter") // Populating fields from the 'Chapter' model (if it has title/description fields)
        .exec();

    res.status(200).json(new ApiResponse(200, branches, "Branches retrieved successfully"));
});

// Get Branch by ID
const getBranchById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Branch ID");
    }

    const branch = await Branch.findById(id)
        .populate("fromChapter toChapter", "title description")
        .exec();

    if (!branch) {
        throw new ApiError(404, "Branch not found");
    }

    res.status(200).json(new ApiResponse(200, branch, "Branch retrieved successfully"));
});

// Update a Branch
const updateBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fromChapter, toChapter, condition } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Branch ID");
    }

    const branch = await Branch.findById(id);
    if (!branch) {
        throw new ApiError(404, "Branch not found");
    }

    // Validate chapter IDs if provided
    if (fromChapter && !isValidObjectId(fromChapter)) {
        throw new ApiError(400, "Invalid 'fromChapter' ID");
    }
    if (toChapter && !isValidObjectId(toChapter)) {
        throw new ApiError(400, "Invalid 'toChapter' ID");
    }

    branch.fromChapter = fromChapter || branch.fromChapter;
    branch.toChapter = toChapter || branch.toChapter;
    branch.condition = condition || branch.condition;

    await branch.save();

    res.status(200).json(new ApiResponse(200, branch, "Branch updated successfully"));
});

// Delete a Branch
const deleteBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Branch ID");
    }

    const branch = await Branch.findById(id);
    if (!branch) {
        throw new ApiError(404, "Branch not found");
    }

    const deletedBranch = await Branch.findByIdAndDelete(id);
    if(!deletedBranch){
        throw new ApiError(500, "Failed to delete branch");
    }

    
    res.status(200).json(new ApiResponse(200, null, "Branch deleted successfully"));
});

// Get Branches by fromChapter
const getBranchesByFromChapter = asyncHandler(async (req, res) => {
    const { fromChapter } = req.params;

    if (!isValidObjectId(fromChapter)) {
        throw new ApiError(400, "Invalid fromChapter ID");
    }

    const branches = await Branch.find({ fromChapter })
        .populate("fromChapter toChapter", "title description")
        .exec();

    if (branches.length === 0) {
        throw new ApiError(404, "No branches found for the given fromChapter");
    }

    res.status(200).json(new ApiResponse(200, branches, "Branches retrieved successfully"));
});


export {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    getBranchesByFromChapter
};
