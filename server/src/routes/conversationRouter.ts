import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";

import * as conversationController from "../controllers/conversationController";
const router: Router = express.Router();
router.get("/:conversationID", verifyFirebaseToken, conversationController.getConversation);
router.post("/:conversationID/newMessage", verifyFirebaseToken, conversationController.createNewMessage);

router.post(
	"/create",
	verifyFirebaseToken,
	conversationController.createConversation
);

export default router;
