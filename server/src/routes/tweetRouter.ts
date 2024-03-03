import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";

import * as tweetController from "../controllers/tweetController";
const router: Router = express.Router();

router.post("/create", verifyFirebaseToken, tweetController.createTweet);

export default router;
