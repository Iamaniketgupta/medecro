import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { 
    initiateRegister, 
    verifyOtp, 
    login, 
    getRefreshToken,
    updateAvatar, 
    addDoctorToUser, 
    removeDoctorFromUser ,
    getuserbyid,
    getuser,
    getPatientsByDoctorId,
    updateUserDetails
} from '../controllers/user.controller.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Routes for registration and login
router.post('/register', initiateRegister);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);
router.get('/user/:id', getuserbyid);

// Route to refresh token
router.get('/refresh-token', getRefreshToken);

// Route to update user avatar
router.post('/avatar', verifyJwt, upload.single('avatar'), updateAvatar);

// Routes to manage doctor associations
router.post('/add-doctor', verifyJwt, addDoctorToUser);
router.post('/remove-doctor', verifyJwt, removeDoctorFromUser);
router.get('/getuser' ,verifyJwt, getuser);
router.get('/getPatientsByDoctorId/:doctorId' ,getPatientsByDoctorId);
router.post('/update',verifyJwt , updateUserDetails)
export default router;
