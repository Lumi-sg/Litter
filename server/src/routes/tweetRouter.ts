import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";

import * as tweetController from "../controllers/tweetController";
const router: Router = express.Router();

router.post("/create", verifyFirebaseToken, tweetController.createTweet);
router.get("/:tweetID", verifyFirebaseToken, tweetController.getTweet);
router.post("/:tweetID/like", verifyFirebaseToken, tweetController.likeTweet);
router.post("/:tweetID/unlike", verifyFirebaseToken, tweetController.unlikeTweet);
router.post("/:tweetID/bookmark", verifyFirebaseToken, tweetController.bookmarkTweet);
router.post("/:tweetID/removebookmark", verifyFirebaseToken, tweetController.removeBookmark);



export default router;
