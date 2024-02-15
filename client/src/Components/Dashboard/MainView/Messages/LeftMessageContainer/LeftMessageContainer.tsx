import TopMessageBar from "./TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import ConversationPreview from "../../../../Features/ConversationPreview/ConversationPreview";
import { Divider, Flex, Group, ScrollArea, Stack } from "@mantine/core";

const LeftMessageContainer = () => {
	return (
		<Flex w={"45%"} mt={10} align={"space-between"} mr={15}>
			<Stack>
				<TopMessageBar />
				<MessageSearchBox />

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
			</Stack>
		</Flex>
	);
};

export default LeftMessageContainer;
