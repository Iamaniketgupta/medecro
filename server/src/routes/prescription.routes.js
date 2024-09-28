import { Router } from "express";
import { verifyJwtForDoctor } from "../middlewares/doctor.auth.middleware.js";
import {
  createPrescription,
  deletePrescriptionById,
  getAllPatientsAppointmentsByDoctorId,
  getAllPrescribedPatients,
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionByPatientId,
} from "../controllers/prescription.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/assign",
  verifyJwtForDoctor,
  upload.single("report"),
  createPrescription
);
router.get("/all", verifyJwtForDoctor, getAllPrescriptions);
router.get(
  "/patients/records/all/:clinicId",
  verifyJwtForDoctor,
  getAllPrescribedPatients
);
router.get("/get/:id", verifyJwtForDoctor, getPrescriptionById);
router.delete("/delete/:id", verifyJwtForDoctor, deletePrescriptionById);
router.get(
  "/getPatientsforPrescription",
  verifyJwtForDoctor,
  getAllPatientsAppointmentsByDoctorId
);
router.get(
  "/getPrescriptionByPatientId/:patientId",
  getPrescriptionByPatientId
);

export default router;
