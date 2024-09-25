import { Router } from 'express';
import { 
    createClinic, 
    updateClinic, 
    deleteClinic, 
    addSchedule, 
    deleteSchedule, 
    updateSchedule ,
    getClinicByDoctorId,
    getAllClinics,
    getClinicById
} from '../controllers/clinic.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyJwtForDoctor} from "../middlewares/doctor.auth.middleware.js"

const router = Router();

// Route to create a new clinic
router.post('/create', verifyJwtForDoctor, upload.array('images'), createClinic);

// Route to update an existing clinic
router.put('/update/:id',verifyJwtForDoctor , upload.array('images'), updateClinic);

// Route to delete a clinic
router.delete('/delete/:id', verifyJwtForDoctor, deleteClinic);

// Route to add a schedule to a clinic
router.post('/add-schedule', verifyJwtForDoctor, addSchedule);

// Route to delete a schedule
router.delete('/delete-schedule/:id', verifyJwtForDoctor, deleteSchedule);

// Route to update a schedule
router.put('/update-schedule/:id', verifyJwtForDoctor, updateSchedule);

router.get("/getClinicByDoctorId/:doctorId", getClinicByDoctorId);

router.get("/getAllClinics", getAllClinics);

router.get('/getClinicById/:id', getClinicById);

export default router;
