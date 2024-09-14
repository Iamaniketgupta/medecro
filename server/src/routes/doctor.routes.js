import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { 
    initiateRegister, 
    verifyOtp, 
    login, 
    getRefreshToken, 
    updateAvatar 
} from '../controllers/doctor.controller.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Routes for registration and login
router.post('/register', initiateRegister);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);

// Route to refresh tokens
router.get('/refresh-token', getRefreshToken);

// Route to update doctor avatar
router.post('/avatar', verifyJwt, upload.single('avatar'), updateAvatar);

export default router;
