import TopMessageBar from "../TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import { Flex } from "@mantine/core";

const LeftMessageContainer = () => {
	return (
		<Flex
			w={"35%"}
			h={"100%"}
			direction={"column"}
			gap={"lg"}
			mt={10}
			align={"center"}
			mr={15}
		>
			<TopMessageBar />
			<MessageSearchBox />
		</Flex>
	);
};

export default LeftMessageContainer;
