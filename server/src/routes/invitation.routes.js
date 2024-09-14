import express from "express";
import {
    createInvitation,
    acceptInvitation,
    rejectInvitation
} from "../controllers/invitation.controller.js";

const router = express.Router();

// Route to create a new invitation
router.post("/create", createInvitation);

// Route to accept an invitation
router.post("/accept/:id", acceptInvitation);

// Route to reject an invitation
router.post("/reject/:id", rejectInvitation);

export default router;
