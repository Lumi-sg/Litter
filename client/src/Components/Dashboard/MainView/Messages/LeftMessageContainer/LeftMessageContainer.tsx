import TopMessageBar from "./TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import ConversationPreview from "../../../../Features/ConversationPreview/ConversationPreview";
import { Divider, Flex, ScrollArea, Space, Stack } from "@mantine/core";
import styles from "./LeftMessageContainer.module.css";
import { useGetAllUsers } from "../../../../../Hooks/useGetAllUsers";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet";

const LeftMessageContainer = () => {
	const { data: allUsers, isLoading } = useGetAllUsers();
	return (
		isLoading ? <LoadingTweet/> :
		<Stack mt={10} h={"90.5vh"} w={"20vw"} ml={10}>
			<TopMessageBar />
			<MessageSearchBox allUsers={allUsers} isLoading={isLoading} />
			<Space h={"md"} />
			<Flex flex={1}>
				<ScrollArea
					scrollbars="y"
					scrollbarSize={4}
					style={{
						overflowY: "auto",
						height: "auto",
						maxHeight: "calc(100vh - 14.25rem)",
						borderTopLeftRadius: 5,
						borderBottomLeftRadius: 5,
					}}
					w={"100%"}
					classNames={styles}
				>
					<Divider />

					<ConversationPreview />
					<ConversationPreview />
					{/* <ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview />
					<ConversationPreview /> */}
				</ScrollArea>
			</Flex>
		</Stack>
	);
};

export default LeftMessageContainer;
