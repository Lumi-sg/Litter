import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";
import * as userController from "../controllers/userController";

const router: Router = express.Router();

router.post("/register", verifyFirebaseToken, userController.registerUser);
router.get("/:username", verifyFirebaseToken, userController.getUser);
router.get(
	"/:username/tweets",
	verifyFirebaseToken,
	userController.getUserTweets
);
router.get(
	"/:username/bookmarks",
	verifyFirebaseToken,
	userController.getUserBookmarks
);
router.get(
	"/:username/likes",
	verifyFirebaseToken,
	userController.getUserLikes
);
router.post(
	"/:username/follow",
	verifyFirebaseToken,
	userController.followUser
);
router.post(
	"/:username/unfollow",
	verifyFirebaseToken,
	userController.unfollowUser
);
router.get(
	"/three-random-users",
	verifyFirebaseToken,
	userController.getThreeRandomUsers
);

export default router;
