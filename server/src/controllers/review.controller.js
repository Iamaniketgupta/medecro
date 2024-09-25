// controllers/doctorReviewController.js
import DoctorReview from '../models/review.model.js';

// Add a new review
export const addReview = async (req, res) => {
    try {
        const { doctorId, userId, rating, comment } = req.body;
        const newReview = new DoctorReview({ doctorId, userId, rating, comment });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully!', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
};

// Get reviews for a doctor
export const getReviewsByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const reviews = await DoctorReview.find({ doctorId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updatedReview = await DoctorReview.findByIdAndUpdate(reviewId, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully!', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update review', error: error.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const deletedReview = await DoctorReview.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};
