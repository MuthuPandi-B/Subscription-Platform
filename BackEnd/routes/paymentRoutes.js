import express from "express";
import { createOrder, getSubscriptionStatus, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify",protect, verifyPayment);
router.get("/subscription-status",protect, getSubscriptionStatus);

export default router;
