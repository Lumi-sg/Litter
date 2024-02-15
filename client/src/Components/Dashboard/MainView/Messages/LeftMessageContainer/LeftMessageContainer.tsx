import TopMessageBar from "./TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import ConversationPreview from "../../../../Features/ConversationPreview/ConversationPreview";
import { Divider, Flex, Group, ScrollArea } from "@mantine/core";

const LeftMessageContainer = () => {
	return (
		<Flex
			w={"45%"}
			direction={"column"}
			mt={10}
			align={"center"}
			mr={15}
			bg={"white"}
		>
			<Group mb={25}>
				<TopMessageBar />
				<MessageSearchBox />
			</Group>
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
			<ConversationPreview />
			<Divider />
		</Flex>
	);
};

export default LeftMessageContainer;
