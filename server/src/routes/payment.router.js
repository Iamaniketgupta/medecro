import { Router } from 'express';
import { createOrder, verifyOrder } from '../controllers/payment.controllers.js';

const router = Router();
router.route("/create_order").post(createOrder);
router.route("/verify_order").post(verifyOrder);

export default router;
