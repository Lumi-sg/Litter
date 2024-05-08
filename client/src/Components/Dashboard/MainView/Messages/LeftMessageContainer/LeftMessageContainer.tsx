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
import { useSelectedConversationStore } from "../../../../../Stores/selectedConversationStore";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { ConversationType } from "../../../../../Types/Conversation";
import UserType from "../../../../../Types/User";
import { Message2 } from "tabler-icons-react";
const LeftMessageContainer = () => {
	const { user } = useUserStore();
	const { data: allUsers, isLoading } = useGetAllUsers();
	const {
		data: conversations,
		isLoading: isLoadingConversations,
		refetch,
	} = useGetUserConversations(convertEmailToUsername(user!.email as string));
	const { selectedConversationID, setSelectedConversationID } =
		useSelectedConversationStore();
	const { socket } = useSocketStore();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	useEffect(() => {
		if (!socket || isLoadingConversations) return;
		conversations?.forEach((conversation) => {
			socket.emit("joinConversation", conversation._id, user);
		});
		socket.on("conversationDeleted", (conversationID, otherUser) => {
			setSelectedConversationID("");
			navigate("/dashboard/messages");
			queryClient.setQueryData(
				["conversations", user?.uid as string],
				(prevConversations: ConversationType[]) => {
					const updatedData = prevConversations.filter(
						(conversation) => {
							return conversation._id !== conversationID;
						}
					);
					return updatedData;
				}
			);
			if (otherUser.email === user?.email) return;
			notifications.show({
				title: "Conversation Deleted",
				message: `${convertEmailToUsername(
					otherUser.email
				)} has deleted the conversation.`,
				color: "red",
				autoClose: false,
			});
		});
		socket.on("conversationCreated", (senderUser: UserType) => {
			if (
				convertEmailToUsername(senderUser.email) ===
				convertEmailToUsername(user?.email as string)
			)
				return;
			refetch();
			notifications.show({
				title: "Conversation Created",
				message: `${convertEmailToUsername(
					senderUser.email
				)} has created a conversation with you.`,
				color: "green",
				autoClose: false,
			});
		});
		socket.on(
			"receiveNewMessage",
			(newMessage, conversationID, senderUsername) => {
				if (selectedConversationID === conversationID) {
					return;
				}
				if (
					senderUsername ===
					convertEmailToUsername(user?.email as string)
				) {
					return;
				}
				//sometimes the socket fires twice I dont know how to fix it in another way
				const doMessagesMatch = conversations!.map((conversation) => {
					if (conversation._id === conversationID) {
						const lastMessage =
							conversation.messages[
								conversation.messages.length - 1
							];
						if (newMessage.timestamp === lastMessage.timestamp) {
							return true;
						}
						return false;
					}
				});
				if (doMessagesMatch) return;
				queryClient.setQueryData(
					["conversations", user?.uid as string],
					(prevConversations: ConversationType[]) => {
						const updatedConversations = prevConversations.map(
							(conversation) => {
								if (conversation._id === conversationID) {
									return {
										...conversation,
										updatedAt: new Date(),
									};
								}
								return conversation;
							}
						);
						//Move updated conversation to the 0th index of the array
						const conversationToMove = updatedConversations.find(
							(conversation) =>
								conversation._id === conversationID
						);
						if (conversationToMove) {
							const index =
								updatedConversations.indexOf(
									conversationToMove
								);
							if (index !== -1) {
								updatedConversations.splice(index, 1);
								updatedConversations.unshift(
									conversationToMove
								);
							}
						}
						return updatedConversations;
					}
				);
				notifications.show({
					title: "New Message from " + senderUsername,
					message: newMessage.content,
					color: "violet",
					icon: <Message2 color="black" />,
					autoClose: 5000,
					onClick: () => {
						navigate(`/dashboard/messages/${conversationID}`);
						notifications.clean();
					},
				});
			}
		);
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
