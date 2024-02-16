import TopMessageBar from "./TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import ConversationPreview from "../../../../Features/ConversationPreview/ConversationPreview";
import { Divider, Flex, ScrollArea, Space, Stack } from "@mantine/core";

const LeftMessageContainer = () => {
	return (
		<Stack mt={10} h={"100%"} w={"20vw"} ml={10}>
			<TopMessageBar />
			<MessageSearchBox />
			<Space h={"md"} />
			<Flex flex={1}>
				<ScrollArea
					offsetScrollbars
					style={{
						overflowY: "auto",
						height: "auto",
						maxHeight: "calc(100vh - 14.25rem)",
					}}
					w={"100%"}
				>
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
				</ScrollArea>
			</Flex>
		</Stack>
	);
};

export default LeftMessageContainer;
