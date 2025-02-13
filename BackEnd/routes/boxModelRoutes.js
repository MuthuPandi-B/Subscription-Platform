import express from "express";
import { getBoxModels, addBoxModel, updateBoxModel, deleteBoxModel } from "../controllers/boxModelController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch all box models
router.get("/", getBoxModels);

// Admin-only routes for adding, updating, and deleting box models
router.post("/", protect, admin, addBoxModel);
router.put("/:id", protect, admin, updateBoxModel);
router.delete("/:id", protect, admin, deleteBoxModel);

export default router;
