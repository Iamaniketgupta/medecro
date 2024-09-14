import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { 
    createClinic, 
    updateClinic, 
    deleteClinic, 
    addSchedule, 
    deleteSchedule, 
    updateSchedule 
} from '../controllers/clinic.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

// Route to create a new clinic
router.post('/create', upload.array('images'), createClinic);

// Route to update an existing clinic
router.put('/update/:id', verifyJwt, upload.array('images'), updateClinic);

// Route to delete a clinic
router.delete('/delete/:id', verifyJwt, deleteClinic);

// Route to add a schedule to a clinic
router.post('/add-schedule', verifyJwt, addSchedule);

// Route to delete a schedule
router.delete('/delete-schedule/:id', verifyJwt, deleteSchedule);

// Route to update a schedule
router.put('/update-schedule/:id', verifyJwt, updateSchedule);

export default router;
