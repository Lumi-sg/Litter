import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";

import * as conversationController from "../controllers/conversationController";
const router: Router = express.Router();

router.post(
	"/create",
	verifyFirebaseToken,
	conversationController.createConversation
);

export default router;
