import express from 'express';
import { getCourses, createCourse, deleteCourse } from '../controllers/courseController.js';
import { admin } from '../middleware/authMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',protect, getCourses);
router.post('/',protect,admin, createCourse);
router.delete('/:id',protect,admin, deleteCourse);

export default router;