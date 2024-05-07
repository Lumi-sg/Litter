import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { verifyFirebaseToken } from "./middleware/firebaseAuth";
import { Server } from "socket.io";
import { convertEmailToUsername } from "./helpers/convertEmailToUsername";

//routes
import userRouter from "./routes/userRouter";
import tweetRouter from "./routes/tweetRouter";
import conversationRouter from "./routes/conversationRouter";

const app = express();
dotenv.config();

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

app.use(compression());
app.use(bodyParser.json());

//DB Stuff
const MONGO_URL = process.env.MONGO_DB_URL;

mongoose.set("strictQuery", false);

if (!MONGO_URL) {
	console.error("MONGO_DB_URL environment variable is not set.");
	process.exit(1); // Exit the application with an error code.
}
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

//Mongo connection info
mongoose.connection.on("error", (error: Error) => {
	console.log(error);
});
mongoose.connection.on("open", () => {
	console.log("Connected to MongoDB");
});

mongoose.connection.on("close", () => {
	console.log("Disconnected from MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// //Middleware
app.use(verifyFirebaseToken);

app.use("/user", userRouter);
app.use("/tweet", tweetRouter);
app.use("/conversation", conversationRouter);

const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});

//Socket.io
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	},
});
const userSocketMap = new Map();
io.on("connection", (socket) => {
	socket.on("disconnect", () => {
		// Remove the user from the map when they disconnect
		userSocketMap.forEach((value, key) => {
			if (value === socket.id) {
				userSocketMap.delete(key);
			}
		});
	});

	socket.on("userConnect", (user) => {
		console.log(
			`${convertEmailToUsername(user.email)} connected to socket`
		);
		userSocketMap.set(convertEmailToUsername(user.email), socket.id);
	});

	socket.on("joinConversation", (conversationID, user) => {
		socket.join(conversationID);
	});

	socket.on("deleteConversation", (conversationID, user) => {
		io.to(conversationID).emit("conversationDeleted", conversationID, user);
		socket.leave(conversationID);
		console.log(`${user.email} left ${conversationID}`);
	});
	socket.on("createConversation", (senderUser, receiverUsername) => {
		console.log(userSocketMap);
		const receiverSocketID = userSocketMap.get(receiverUsername);
		if (!receiverSocketID) {
			console.log("receiverSocketID not found");
			return;
		}
		io.to(receiverSocketID).emit("conversationCreated", senderUser);
	});
	socket.on(
		"newMessage",
		(messageContent, conversationID, senderUserFirebaseID) => {
			const newMessage = {
				content: messageContent,
				senderFirebaseID: senderUserFirebaseID,
				timestamp: new Date(),
			};
			if (!messageContent || !conversationID || !senderUserFirebaseID) {
				console.log("Invalid message data");
				return;
			}

			io.to(conversationID).emit("receiveNewMessage", newMessage, conversationID);
			console.log("New message sent to", conversationID, messageContent);
		}
	);
});
