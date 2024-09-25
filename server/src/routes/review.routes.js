// routes/doctorReviewRoutes.js
import express from 'express';
import {
    addReview,
    getReviewsByDoctorId,
    updateReview,
    deleteReview,
} from '../controllers/review.controller.js';

const router = express.Router();

// Add a new review
router.post('/', addReview);

// Get reviews for a specific doctor
router.get('/:doctorId', getReviewsByDoctorId);

// Update a review by ID
router.put('/:reviewId', updateReview);

// Delete a review by ID
router.delete('/:reviewId', deleteReview);

export default router;
