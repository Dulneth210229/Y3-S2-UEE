import express from "express";
import upload from "../middleware/upload.js";

import { getMessages, sendMessage, sendAudioMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:sender/:receiver", getMessages);
router.post("/", sendMessage);
router.post("/audio", upload.single("audio"), sendAudioMessage);

export default router;
