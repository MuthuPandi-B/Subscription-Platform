import express from "express";
import { getSubscribedUsers, sendMessageToSubscribers } from "../controllers/messageController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-messages", protect, admin, sendMessageToSubscribers);
router.get("/subscribed-users",getSubscribedUsers)
export default router;
