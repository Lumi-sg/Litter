import { useEffect } from "react";
import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";
import { Center, Divider, Flex, Group } from "@mantine/core";
import { useComponentStore } from "../../../../Stores/componentStore";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../../../Features/ErrorPage/ErrorPage";
import { io } from "socket.io-client";
import { baseURL } from "../../../../constants/baseURL";
import { useUserStore } from "../../../../Stores/userStore";
import { useSocketStore } from "../../../../Stores/socketStore";

const Messages = () => {
	const { user } = useUserStore();
	const { setSelectedComponent } = useComponentStore();
	const { socket, setSocket } = useSocketStore();

	useEffect(() => {
		setSelectedComponent("Messages");
	}, []);

	//setup socket
	useEffect(() => {
		const newSocket = io(baseURL);
		setSocket(newSocket);
	}, []);

	useEffect(() => {
		if (!socket) return;
		socket.on("connect", () => {
			socket.emit("userConnect", user);
			console.log(`${user?.displayName} connected to server socket.`);
		});

		return () => {
			socket.disconnect();
		};
	}, [socket]);

	return (
		<Group h={"calc (100vh - 18.85rem)"} miw={"60vw"}>
			<LeftMessageContainer />
			<Divider orientation="vertical" />
			<Routes>
				<Route
					path="/"
					element={
						<Flex
							h={"calc(100vh - 5.7rem)"}
							flex={1}
							justify={"center"}
							align={"center"}
						>
							<Center>
								<div
									style={{
										fontSize: "1.2rem",
										color: "white",
									}}
								>
									Start a new conversation!
								</div>
							</Center>
						</Flex>
					}
					errorElement={<ErrorPage />}
				/>

				<Route
					path="/:conversationID"
					element={<RightMessageContainer />}
					errorElement={<ErrorPage />}
				/>
			</Routes>
			<Divider orientation="vertical" />
		</Group>
	);
};

export default Messages;
