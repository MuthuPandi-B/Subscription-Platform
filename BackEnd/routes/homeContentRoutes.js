import express from "express";
import { getHomeContent, updateHomeContent } from "../controllers/homeContentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to get homepage content
router.get("/", getHomeContent);

// Admin-only route to update homepage content
router.put("/", protect, admin, updateHomeContent);

export default router;
