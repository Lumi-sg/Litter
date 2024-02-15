import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";
import { Divider, Flex, Group } from "@mantine/core";

const Messages = () => {
	return (
		<Group
			mih={"calc (100vh - 18.85rem)"}
			bg={"gray"}
			miw={"60vw"}
		>
			<LeftMessageContainer />
			{/* <Divider orientation="vertical" />
			<RightMessageContainer /> */}
		</Group>
	);
};

export default Messages;
