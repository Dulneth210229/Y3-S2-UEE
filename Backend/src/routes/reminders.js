import express from "express";
import { createReminder, getUserReminders, markAsSent } from "../controllers/reminderController.js";

const router = express.Router();

router.post("/", createReminder);
router.get("/:userId", getUserReminders);
router.put("/:id/sent", markAsSent);

export default router;
