import admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
    currentUser: any; // Define the type of currentUser as per your requirements
  }

const serviceAccount = require("../litterFirebaseConfig.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export const verifyFirebaseToken = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const firebaseToken = req.headers.authorization?.split("Bearer ")[1];

	if (!firebaseToken) {
		return res.status(401).send("Unauthorized - Missing Firebase Token");
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
		req["currentUser"] = decodedToken; // Attach user information to the request object
		next();
	} catch (error) {
		console.error("Error verifying Firebase token:", error);
		return res
			.status(401)
			.json({ error: "Unauthorized - Invalid Firebase token" });
	}
};
