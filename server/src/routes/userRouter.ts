import express, { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth";
import * as userController from "../controllers/userController";

const router: Router = express.Router();

router.post("/register", verifyFirebaseToken, userController.registerUser);

export default router;
