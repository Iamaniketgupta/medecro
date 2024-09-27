// routes/clinicReviewRoutes.js
import express from 'express';
import {
    addReview,
    getReviewsByClinicId,
    updateReview,
    deleteReview,
} from '../controllers/review.controller.js';  // Updated controller import to match the schema

const router = express.Router();

// Add a new review
router.post('/', addReview);

// Get reviews for a specific clinic
router.get('/:clinicId', getReviewsByClinicId);  // Changed 'clin' to 'clinicId' to match the controller and schema

// Update a review by ID
router.put('/:reviewId', updateReview);

// Delete a review by ID
router.delete('/:reviewId', deleteReview);

export default router;
