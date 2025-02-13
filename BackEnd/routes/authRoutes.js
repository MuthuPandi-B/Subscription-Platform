import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword, addPaidCourse, getPaidCourses, getUserInfo } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/add-paid-course',protect, addPaidCourse);
router.get('/get-paid-courses',protect, getPaidCourses);
router.get("/user-info", protect, getUserInfo); // Protect this route with the token

export default router;