import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
// import { getUserStats } from '../controllers/getUserStat.js';
import {
    getUserById,
    initiateRegister,
    login,
    verifyOtp,
    updateProfilePicture,
    
    getUser
} from '../controllers/user.controller.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/register').post(initiateRegister);
router.route('/verifyOtp').post(verifyOtp);
router.route('/login').post(login);

// Routes for updating profile picture and cover image
router.post('/profile-picture', verifyJwt, upload.single('profilePicture'), updateProfilePicture);



// Route to get a user by their ID
router.get("/getuserbyid/:id", getUserById);
router.get("/getuser" ,verifyJwt, getUser)
// router.get("/getuserStats" ,verifyJwt, getUserStats);


export default router;
