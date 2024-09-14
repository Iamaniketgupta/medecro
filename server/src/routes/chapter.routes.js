import express from "express";
import {
    createChapter,
    getAllChapters,
    getChapterById,
    updateChapter,
    deleteChapter,
    getChaptersByStoryId
} from "../controllers/chapter.controller.js";

const router = express.Router();

router.post("/create", createChapter);             // Create a new chapter
router.get("/getall", getAllChapters);             // Get all chapters
router.get("/get/:id", getChapterById);          // Get a chapter by ID
router.post("/update/:id", updateChapter);           // Update a chapter by ID
router.get("/delete/:id", deleteChapter);  
router.get("/getChaptersByStoryId/:storyId" , getChaptersByStoryId)      // Delete a chapter by ID

export default router;
