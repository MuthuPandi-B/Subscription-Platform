import express from 'express';
import { getCourses, createCourse, deleteCourse, updateCourse, getPaidCourses } from '../controllers/courseController.js';
import { admin } from '../middleware/authMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',protect, getCourses);
router.post('/',protect,admin, createCourse);
router.put('/:id',protect,admin, updateCourse);
router.delete('/:id',protect,admin, deleteCourse);
router.get('/admin/students-paid',protect,admin, getPaidCourses);


export default router;