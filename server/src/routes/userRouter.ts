import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";
import * as userController from "../controllers/userController";

const router: Router = express.Router();

router.post("/register", verifyFirebaseToken, userController.registerUser);
router.get("/:username", verifyFirebaseToken, userController.getUser);
router.get("/:username/tweets", verifyFirebaseToken, userController.getUserTweets);

export default router;
