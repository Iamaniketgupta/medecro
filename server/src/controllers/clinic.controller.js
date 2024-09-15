import { Clinic } from '../models/clinic.model.js';
import { Schedule } from '../models/schedule.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Create a new clinic
const createClinic = asyncHandler(async (req, res) => {
    const { name, address, coordinates, licenseNumber, mobileNo, doctor }
     = req.body;

    const address1 = JSON.parse(address);
    const coordinates1 = JSON.parse(coordinates);

     console.log({ name, address1, coordinates1, licenseNumber, mobileNo, doctor })

    if (!name || !address || !coordinates || !licenseNumber || !mobileNo || !doctor) {
        throw new ApiError(400, "All fields are required");
    }

    let images = [];
    console.log(req.files)
    if (req.files) {
        console.log("first")
        // Upload images to Cloudinary
        const imageUploadPromises = req.files.map(file => uploadToCloudinary(file.path));
        const uploadResults = await Promise.all(imageUploadPromises);
        console.log(uploadResults)
        images = uploadResults.map(result => result.secure_url);
    }

    
    const clinic = new Clinic({
        name,
        address:address1,
        coordinates:coordinates1,
        licenseNumber,
        mobileNo,
        doctor,
        images
    });

    await clinic.save();
    res.status(201).json(new ApiResponse(201, clinic, "Clinic created successfully"));
});

// Update an existing clinic
const updateClinic = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Check if schedules need to be updated
    if (updateData.scheduleIds) {
        const schedules = await Schedule.find({ _id: { $in: updateData.scheduleIds } });
        if (schedules.length !== updateData.scheduleIds.length) {
            throw new ApiError(400, "Some schedules do not exist");
        }
        updateData.schedules = updateData.scheduleIds;
        delete updateData.scheduleIds;
    }

    // Handle image updates
    if (req.files && req.files.images) {
        const clinic = await Clinic.findById(id);
        if (!clinic) {
            throw new ApiError(404, "Clinic not found");
        }

        // Delete old images from Cloudinary
        if (clinic.images.length > 0) {
            const deletePromises = clinic.images.map(url => deleteFromCloudinary(url));
            await Promise.all(deletePromises);
        }

        // Upload new images to Cloudinary
        const imageUploadPromises = req.files.images.map(file => uploadToCloudinary(file.path));
        const uploadResults = await Promise.all(imageUploadPromises);
        updateData.images = uploadResults.map(result => result.secure_url);
    }

    const clinic = await Clinic.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!clinic) {
        throw new ApiError(404, "Clinic not found");
    }

    res.status(200).json(new ApiResponse(200, clinic, "Clinic updated successfully"));
});

// Delete a clinic
const deleteClinic = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const clinic = await Clinic.findById(id);
    if (!clinic) {
        throw new ApiError(404, "Clinic not found");
    }

    // Delete images from Cloudinary
    if (clinic.images.length > 0) {
        const deletePromises = clinic.images.map(url => deleteFromCloudinary(url));
        await Promise.all(deletePromises);
    }

    await Clinic.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200, null, "Clinic deleted successfully"));
});

// Add a schedule to a clinic
const addSchedule = asyncHandler(async (req, res) => {
    const { clinicId, scheduleData } = req.body;

    if (!clinicId || !scheduleData) {
        throw new ApiError(400, "Clinic ID and schedule data are required");
    }

    const schedule = new Schedule(scheduleData);
    await schedule.save();

    // Add the new schedule to the clinic
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
        throw new ApiError(404, "Clinic not found");
    }

    clinic.schedules.push(schedule._id);
    await clinic.save();

    res.status(201).json(new ApiResponse(201, schedule, "Schedule added successfully"));
});

// Delete a schedule
const deleteSchedule = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find and delete the schedule
    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) {
        throw new ApiError(404, "Schedule not found");
    }

    // Remove the schedule reference from all clinics
    await Clinic.updateMany(
        { schedules: id },
        { $pull: { schedules: id } }
    );

    res.status(200).json(new ApiResponse(200, null, "Schedule deleted successfully"));
});

// Update a schedule
const updateSchedule = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const schedule = await Schedule.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!schedule) {
        throw new ApiError(404, "Schedule not found");
    }

    res.status(200).json(new ApiResponse(200, schedule, "Schedule updated successfully"));
});



export {
    createClinic,
    updateClinic,
    deleteClinic,
    addSchedule,
    deleteSchedule,
    updateSchedule
};
