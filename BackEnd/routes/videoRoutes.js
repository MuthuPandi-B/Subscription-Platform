import express from "express";
import {
  getVideosByCourse,
  addVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get all videos for a course
router.get("/:courseId", protect, getVideosByCourse);

// Route to add a new video (Admin only)
router.post("/", protect, admin, addVideo);

// Route to update a video (Admin only)
router.put("/:videoId", protect, admin, updateVideo);

// Route to delete a video (Admin only)
router.delete("/:videoId", protect, admin, deleteVideo);

export default router;
