import  {Clinic}  from '../models/clinic.model.js';
import { Doctor } from '../models/doctor.model.js';
import { Schedule } from '../models/schedule.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';


const createClinic = asyncHandler(async (req, res) => {
    const { 
        name, 
        address, 
        city, 
        state, 
        zipCode, 
        phoneNumber, 
        emailAddress, 
        coordinates 
    } = req.body;

    const doctor = req.user;
    if(!doctor){
        throw new ApiError("Docotor not found", 401);
    }

    // Input validation
    if (!name || !address || !city || !state || !zipCode || !coordinates) {
        throw new ApiError(400, "All required fields must be provided");
    }

    // Parse coordinates from the string to an array
    let parsedCoordinates;
    try {
        parsedCoordinates = coordinates.split(',').map(coord => parseFloat(coord.trim()));
        if (parsedCoordinates.length !== 2 || parsedCoordinates.some(isNaN)) {
            throw new Error('Invalid coordinates format. Please provide "latitude, longitude".');
        }
    } catch (error) {
        throw new ApiError(400, error.message);
    }

    // Upload images to Cloudinary if available
    let clinicImages = [];
    if (req.files && req.files.length > 0) {
        const imageUploadPromises = req.files.map(file => uploadToCloudinary(file.path));
        const uploadResults = await Promise.all(imageUploadPromises);
        clinicImages = uploadResults.map(result => result.secure_url);
    }

    // Create new clinic
    const clinic = new Clinic({
        clinicName: name,
        address,
        city,
        state,
        zipCode,
        phoneNumber,
        emailAddress,
        locationCoordinates: parsedCoordinates,
        clinicImages,
        doctor:doctor?._id
    });

    // Save clinic to DB
    await clinic.save();
    res.status(201).json(new ApiResponse(201, clinic, "Clinic created successfully"));
});


// Update an existing clinic
const updateClinic = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Handle image updates if new images are uploaded
    if (req.files && req.files.length > 0) {
        const clinic = await Clinic.findById(id);
        if (!clinic) throw new ApiError(404, "Clinic not found");

        // Delete old images from Cloudinary
        if (clinic.clinicImages.length > 0) {
            const deletePromises = clinic.clinicImages.map(url => deleteFromCloudinary(url));
            await Promise.all(deletePromises);
        }

        // Upload new images
        const imageUploadPromises = req.files.map(file => uploadToCloudinary(file.path));
        const uploadResults = await Promise.all(imageUploadPromises);
        updateData.clinicImages = uploadResults.map(result => result.secure_url);
    }

    // Update clinic in DB
    const clinic = await Clinic.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!clinic) throw new ApiError(404, "Clinic not found");

    res.status(200).json(new ApiResponse(200, clinic, "Clinic updated successfully"));
});

// Delete a clinic
const deleteClinic = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const clinic = await Clinic.findById(id);
    if (!clinic) throw new ApiError(404, "Clinic not found");

    // Delete clinic images from Cloudinary
    if (clinic.clinicImages.length > 0) {
        const deletePromises = clinic.clinicImages.map(url => deleteFromCloudinary(url));
        await Promise.all(deletePromises);
    }

    // Delete clinic from DB
    await Clinic.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, null, "Clinic deleted successfully"));
});

// Add a schedule to a clinic
const addSchedule = asyncHandler(async (req, res) => {
    const { clinicId, scheduleData } = req.body;

    if (!clinicId || !scheduleData) {
        throw new ApiError(400, "Clinic ID and schedule data are required");
    }

    // Create new schedule
    const schedule = new Schedule(scheduleData);
    await schedule.save();

    // Add the new schedule to the clinic
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) throw new ApiError(404, "Clinic not found");

    clinic.schedules.push(schedule._id);
    await clinic.save();

    res.status(201).json(new ApiResponse(201, schedule, "Schedule added successfully"));
});

// Delete a schedule
const deleteSchedule = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find and delete the schedule
    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) throw new ApiError(404, "Schedule not found");

    // Remove the schedule reference from clinics
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

    // Update schedule in DB
    const schedule = await Schedule.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!schedule) throw new ApiError(404, "Schedule not found");

    res.status(200).json(new ApiResponse(200, schedule, "Schedule updated successfully"));
});


const getClinicByDoctorId = asyncHandler(async (req, res) => {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
        throw new ApiError(404, 'Doctor not found');
    }

    const clinics = await Clinic.find({ doctor: doctor._id });
    if (!clinics) {
        throw new ApiError(404, 'Clinics not found');
    }

    res.status(200).json(new ApiResponse(200, clinics, 'Clinics retrieved successfully'));
    
})

const getAllClinics = asyncHandler(async (req, res) => {
    const clinics = await Clinic.find();
    res.status(200).json(new ApiResponse(200, clinics, 'All Clinics retrieved successfully'));
})


const getClinicById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const clinic = await Clinic.findById(id).populate("doctor");
    if (!clinic) throw new ApiError(404, "Clinic not found");
    res.status(200).json(new ApiResponse(200, clinic, "Clinic retrieved successfully"));
})
export {
    createClinic,
    updateClinic,
    deleteClinic,
    addSchedule,
    deleteSchedule,
    updateSchedule,
    getClinicByDoctorId,
    getAllClinics,
    getClinicById
};
