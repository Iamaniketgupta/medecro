import express from "express";
import {
    createComment,
    getCommentsForStory,
    getCommentById,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js";

const router = express.Router();

// Route to create a new comment
router.post("/create", createComment);

// Route to get all comments for a specific story
router.get("/story/:storyId", getCommentsForStory);

// Route to get a comment by ID
router.get("/:id", getCommentById);

// Route to update a comment by ID
router.post("/update/:id", updateComment);

// Route to delete a comment by ID
router.get("/delete/:id", deleteComment);

export default router;
