import { Router } from 'express';

import { 
    initiateRegister, 
    verifyOtp, 
    login, 
    getRefreshToken, 
    updateAvatar ,
    getPatients,
    getDoctorById,
    getdoctor
} from '../controllers/doctor.controller.js';
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtForDoctor } from '../middlewares/doctor.auth.middleware.js';

const router = Router();

// Routes for registration and login
router.post('/register', initiateRegister);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);

// Route to refresh tokens
router.get('/refresh-token', getRefreshToken);
router.get("/getDoctorById/:id" , getDoctorById);

// Route to update doctor avatar
router.post('/avatar', verifyJwtForDoctor, upload.single('avatar'), updateAvatar);
router.get('/patients',verifyJwtForDoctor, getPatients);
router.get("/getdoctor" , verifyJwtForDoctor , getdoctor)

export default router;
