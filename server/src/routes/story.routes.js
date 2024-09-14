import express from "express";
import {
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
} from "../controllers/story.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", upload.single('coverImage'), createStory);

router.get("/getall", getAllStories);

router.get("/get/:id", getStoryById);

// Route to update a story by ID
router.post("/update/:id", updateStory);

router.get("/delete/:id", deleteStory); 

router.post("/updatePublicationStatus/:id", updatePublicationStatus);

router.post("/like/:id", likeStory);

router.post("/unlike/:id", unlikeStory);
router.post("/addChapterToStory/:id" , addChapterToStory);
router.post("/addMainChapterToStory/:id" , addMainChapterToStory);
router.get("/getStoriesByUserId/:userId"  , getStoriesByUserId)

export default router;
