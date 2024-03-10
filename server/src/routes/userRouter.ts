import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";
import * as userController from "../controllers/userController";

const router: Router = express.Router();
router.get("/homefeed", verifyFirebaseToken, userController.getHomeFeed);
router.get("/allusers", verifyFirebaseToken, userController.getAllUsers);
router.get(
	"/randomusers",
	verifyFirebaseToken,
	userController.getThreeRandomUsers
);
router.post(
	"/mark-notifications-read",
	verifyFirebaseToken,
	userController.markNotificationsRead
);
router.post(
	"/marknotificationread/:notificationID",
	verifyFirebaseToken,
	userController.markSingleNotificationRead
);

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
	"/:username/notifications",
	verifyFirebaseToken,
	userController.getUserNotifications
);

export default router;
