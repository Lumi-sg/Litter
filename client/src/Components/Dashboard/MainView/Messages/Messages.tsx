import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";

import { Divider, Flex } from "@mantine/core";

const Messages = () => {
	return (
		<Flex h={"100%"} w={"63vw"} direction={"row"}>
			<LeftMessageContainer />
			<Divider orientation="vertical" />
			<RightMessageContainer />
		</Flex>
	);
};

export default Messages;
