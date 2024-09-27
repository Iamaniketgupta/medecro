// controllers/clinicReviewController.js
import ClinicReview from '../models/review.model.js';  // Correct import to match your model name

// Add a new review
export const addReview = async (req, res) => {
    try {
        const { clinicId, userId, rating, comment } = req.body;
        const newReview = new ClinicReview({ clinicId, userId, rating, comment });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully!', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
};

// Get reviews for a clinic
export const getReviewsByClinicId = async (req, res) => {
    try {
        const { clinicId } = req.params;
        const reviews = await ClinicReview.find({ clinicId }).populate('userId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updatedReview = await ClinicReview.findByIdAndUpdate(reviewId, req.body, { new: true });
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
        const deletedReview = await ClinicReview.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};
