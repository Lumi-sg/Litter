import TopMessageBar from "./TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import ConversationPreview from "../../../../Features/ConversationPreview/ConversationPreview";
import { Divider, Flex, Group, ScrollArea } from "@mantine/core";

const LeftMessageContainer = () => {
	return (
		<Flex w={"35%"} direction={"column"} mt={10} align={"center"} mr={15}>
			<Group mb={"5vh"}>
				<TopMessageBar />
				<MessageSearchBox />
			</Group>
			<ScrollArea.Autosize
				mah={"75vh"}
				w={"100%"}
				mx="auto"
				offsetScrollbars
				scrollbarSize={4}
			>
				<Flex direction={"column"} w={"100%"} h={"100%"}>
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
			</ScrollArea.Autosize>
		</Flex>
	);
};

export default LeftMessageContainer;
