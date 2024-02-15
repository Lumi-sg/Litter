import LeftMessageContainer from "./LeftMessageContainer/LeftMessageContainer";
import RightMessageContainer from "./RightMessageContainer/RightMessageContainer";

import { Divider, Flex } from "@mantine/core";

const Messages = () => {
	return (
		<Flex h={865}>
			<LeftMessageContainer />

			<Divider orientation="vertical" />
			<RightMessageContainer />
		</Flex>
	);
};

export default Messages;
