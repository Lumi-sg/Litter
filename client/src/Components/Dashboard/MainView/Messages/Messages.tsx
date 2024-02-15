import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";
import { Divider, Group } from "@mantine/core";

const Messages = () => {
	return (
		<>
			<Group mih={"calc (100vh - 18.85rem)"} miw={"60vw"}>
				<LeftMessageContainer />
				<Divider orientation="vertical" />
			<RightMessageContainer />
			</Group>
		</>
	);
};

export default Messages;
