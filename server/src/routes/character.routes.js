import express from "express";
import {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter
} from "../controllers/character.controller.js";

const router = express.Router();

router.post("/", createCharacter);             // Create a new character
router.get("/getall", getAllCharacters);             // Get all characters
router.get("/get/:id", getCharacterById);          // Get a character by ID
router.post("/update/:id", updateCharacter);           // Update a character by ID
router.get("/delete/:id", deleteCharacter);        // Delete a character by ID

export default router;
