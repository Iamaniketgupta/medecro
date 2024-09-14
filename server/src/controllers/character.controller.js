import { Character } from "../models/character.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";

// Create a new character
const createCharacter = asyncHandler(async (req, res) => {
    const { name, traits, background, motivations, story } = req.body;

    if (!name || !story) {
        throw new ApiError(400, "Name and story are required");
    }

    const character = await Character.create({ name, traits, background, motivations, story });
    res.status(201).json(new ApiResponse(201, character, "Character created successfully"));
});

// Get all characters
const getAllCharacters = asyncHandler(async (req, res) => {
    const characters = await Character.find().populate("story", "title");
    res.status(200).json(new ApiResponse(200, characters, "Characters retrieved successfully"));
});

// Get character by ID
const getCharacterById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid character ID");
    }

    const character = await Character.findById(id).populate("story", "title");
    if (!character) {
        throw new ApiError(404, "Character not found");
    }

    res.status(200).json(new ApiResponse(200, character, "Character retrieved successfully"));
});

// Update character by ID
const updateCharacter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, traits, background, motivations, story } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid character ID");
    }

    const character = await Character.findByIdAndUpdate(
        id,
        { name, traits, background, motivations, story },
        { new: true, runValidators: true }
    );

    if (!character) {
        throw new ApiError(404, "Character not found");
    }

    res.status(200).json(new ApiResponse(200, character, "Character updated successfully"));
});

// Delete character by ID
const deleteCharacter = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid character ID");
    }

    const character = await Character.findByIdAndDelete(id);

    if (!character) {
        throw new ApiError(404, "Character not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Character deleted successfully"));
});

export {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
};
