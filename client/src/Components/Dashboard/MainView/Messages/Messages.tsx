import { useEffect } from "react";
import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";
import { Center, Divider, Flex, Group, Stack } from "@mantine/core";
import { useComponentStore } from "../../../../Stores/componentStore";
import { Route, Routes } from "react-router-dom";

const Messages = () => {
	const { setSelectedComponent } = useComponentStore();

	useEffect(() => {
		setSelectedComponent("Messages");
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
				/>
			</Routes>
			<Divider orientation="vertical" />
		</Group>
	);
};

export default Messages;
