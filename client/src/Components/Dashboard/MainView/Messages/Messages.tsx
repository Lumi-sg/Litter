import { useEffect } from "react";
import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";
import { Divider, Group } from "@mantine/core";
import { useComponentStore } from "../../../../Stores/componentStore";

const Messages = () => {
	const { setSelectedComponent } = useComponentStore();

	useEffect(() => {
		setSelectedComponent("Messages");
	}, []);

	return (
		<Group h={"calc (100vh - 18.85rem)"} miw={"60vw"}>
			<LeftMessageContainer />
			<Divider orientation="vertical" />
			<RightMessageContainer />
			<Divider orientation="vertical" />
		</Group>
	);
};

export default Messages;
