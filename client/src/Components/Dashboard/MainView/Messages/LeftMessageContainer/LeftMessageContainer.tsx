import TopMessageBar from "./TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import ConversationPreview from "../../../../Features/ConversationPreview/ConversationPreview";
import {
	Divider,
	Flex,
	Group,
	ScrollArea,
	Space,
	Stack,
	Box,
} from "@mantine/core";

const LeftMessageContainer = () => {
	return (
		<Stack justify="space-around" mt={10} h={"100%"} w={"20vw"} ml={10}>
			<TopMessageBar />
			<MessageSearchBox />
			<Space h={90} />
			<Flex flex={1}>
				<ScrollArea
					offsetScrollbars
					style={{
						overflowY: "auto",
						height: "auto",
						maxHeight: "calc(100vh - 18.85rem)",
					}}
					w={"100%"}
				>
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
