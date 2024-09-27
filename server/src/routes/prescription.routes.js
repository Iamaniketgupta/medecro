import { Router } from 'express';
import { verifyJwtForDoctor } from '../middlewares/doctor.auth.middleware.js';
import { createPrescription, deletePrescriptionById, getAllPatientsAppointmentsByDoctorId, getAllPrescriptions, getPrescriptionById } from '../controllers/prescription.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/assign',  verifyJwtForDoctor,upload.array('reports'),createPrescription);
router.get('/all', verifyJwtForDoctor,getAllPrescriptions);
router.get('/get/:id', verifyJwtForDoctor, getPrescriptionById);
router.delete('/delete/:id', verifyJwtForDoctor, deletePrescriptionById);
router.get('/getPatientsforPrescription', verifyJwtForDoctor, getAllPatientsAppointmentsByDoctorId);

export default router;
