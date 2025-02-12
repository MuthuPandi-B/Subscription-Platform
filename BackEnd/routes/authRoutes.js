import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword, addPaidCourse, getPaidCourses } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/add-paid-course',protect, addPaidCourse);
router.get('/get-paid-courses',protect, getPaidCourses);

export default router;