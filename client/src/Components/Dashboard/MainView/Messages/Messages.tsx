import { useEffect } from "react";
import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";
import { Center, Divider, Flex, Group } from "@mantine/core";
import { useComponentStore } from "../../../../Stores/componentStore";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../../../Features/ErrorPage/ErrorPage";
import {io} from "socket.io-client";
import { baseURL } from "../../../../constants/baseURL";

const Messages = () => {
	const { setSelectedComponent } = useComponentStore();

	useEffect(() => {
		setSelectedComponent("Messages");
	}, []);

	//setup socket
	useEffect(() => {
		const socket = io("http://localhost:3000");
		socket.on("connect", () => {
			console.log(socket.id);
			console.log("Client connected to server");
		});
		return () => {
			socket.disconnect();
		};
	}, []);

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
