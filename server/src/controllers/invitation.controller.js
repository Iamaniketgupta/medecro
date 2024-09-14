import { Invitation } from "../models/invitation.model.js";
import { Story } from "../models/story.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Create a new invitation
const createInvitation = asyncHandler(async (req, res) => {
    const { sender, receiver, storyId } = req.body;

    if (!sender || !receiver || !storyId) {
        throw new ApiError(400, "Sender, receiver, and story ID are required");
    }

    const invitation = await Invitation.create({ sender, receiver, storyId });

    // Send email to the receiver
    const story = await Story.findById(storyId);
    const mailOptions = {
        from: process.env.EMAIL,
        to: receiver, // Assuming receiver is an email here, otherwise fetch email from User model
        subject: 'You have a new story invitation!',
        text: `You have been invited by ${sender} to collaborate on the story "${story.title}". Click the link to view and respond to the invitation: [View Invitation](https://your-site-url.com/invitation/${invitation._id})`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    res.status(201).json(new ApiResponse(201, invitation, "Invitation created successfully"));
});

// Accept an invitation
const acceptInvitation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const invitation = await Invitation.findById(id);
    if (!invitation) {
        throw new ApiError(404, "Invitation not found");
    }

    if (invitation.status !== 'pending') {
        throw new ApiError(400, "Invitation already responded to");
    }

    // Update the invitation status
    invitation.status = 'accepted';
    await invitation.save();

    // Add the user to the story's collaborators
    const story = await Story.findById(invitation.storyId);
    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    if (!story.collaborators.includes(invitation.receiver)) {
        story.collaborators.push(invitation.receiver);
        await story.save();
    }

    res.status(200).json(new ApiResponse(200, invitation, "Invitation accepted successfully"));
});

// Reject an invitation
const rejectInvitation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const invitation = await Invitation.findById(id);
    if (!invitation) {
        throw new ApiError(404, "Invitation not found");
    }

    if (invitation.status !== 'pending') {
        throw new ApiError(400, "Invitation already responded to");
    }

    // Update the invitation status
    invitation.status = 'rejected';
    await invitation.save();

    res.status(200).json(new ApiResponse(200, invitation, "Invitation rejected successfully"));
});

export {
    createInvitation,
    acceptInvitation,
    rejectInvitation
};
