import TopMessageBar from "./TopMessageBar/TopMessageBar";
import { MessageSearchBox } from "../../../../Features/MessageSearchBox/MessageSearchbox";
import ConversationPreview from "../../../../Features/ConversationPreview/ConversationPreview";
import { Divider, Flex, ScrollArea, Space, Stack } from "@mantine/core";
import styles from "./LeftMessageContainer.module.css";
import { useGetAllUsers } from "../../../../../Hooks/User Hooks/useGetAllUsers";
import { useGetUserConversations } from "../../../../../Hooks/Conversation Hooks/useGetUserConversations";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet";
import { useUserStore } from "../../../../../Stores/userStore";
import { convertEmailToUsername } from "../../../../../Helpers/convertEmailToUsername";
import { useSocketStore } from "../../../../../Stores/socketStore";
import { useEffect } from "react";

const LeftMessageContainer = () => {
	const { user } = useUserStore();
	const { data: allUsers, isLoading } = useGetAllUsers();
	const { data: conversations, isLoading: isLoadingConversations } =
		useGetUserConversations(convertEmailToUsername(user!.email as string));

	const { socket } = useSocketStore();

	useEffect(() => {
		if (!socket || isLoadingConversations) return;
		conversations?.forEach((conversation) => {
			socket.emit("joinConversation", conversation._id, user);
		});
	}, [conversations]);
	return (
		<Stack mt={10} h={"90vh"} w={"20vw"} ml={10}>
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
					{isLoadingConversations ? (
						<LoadingTweet />
					) : (
						<>
							{conversations?.map((conversation) => (
								<ConversationPreview
									key={conversation._id}
									conversation={conversation}
								/>
							))}
						</>
					)}
				</ScrollArea>
			</Flex>
		</Stack>
	);
};

export default LeftMessageContainer;
