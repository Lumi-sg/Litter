import { ActionIcon, TextInput, rem } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./ConversationInput.module.css";
import { useState } from "react";
import { ConversationType } from "../../../Types/Conversation";
import { useCreateNewMessage } from "../../../Hooks/Conversation Hooks/useCreateNewMessage";
import { getOtherUserInConversation } from "../../../Helpers/getOtherUserInConversation";
import { useSocketStore } from "../../../Stores/socketStore";
import { useUserStore } from "../../../Stores/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { MessageType } from "../../../Types/Message";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { useSelectedConversationStore } from "../../../Stores/selectedConversationStore";

type ConversationInputProps = {
	conversation: ConversationType;
};

const ConversationInput = ({ conversation }: ConversationInputProps) => {
	const otherUser = getOtherUserInConversation(conversation.participants);
	const [message, setMessage] = useState("");
	const { socket } = useSocketStore();
	const { user } = useUserStore();
	const queryClient = useQueryClient();

	const { selectedConversationID, setSelectedConversationID } =
		useSelectedConversationStore();

	const useCreateNewMessageMutation = useCreateNewMessage(
		conversation._id,
		message,
		otherUser?.username as string
	);

	const handleSubmit = async () => {
		socket?.emit(
			"newMessage",
			message,
			conversation._id,
			user?.uid,
			convertEmailToUsername(user?.email as string),
			user?.photoURL
		);
		queryClient.setQueryData(
			["conversation", conversation._id],
			(prevConversation: ConversationType) => {
				// @ts-ignore
				const newMessage: MessageType = {
					content: message,
					senderFirebaseID: user?.uid as string,
					timestamp: new Date(),
				};
				// @ts-ignore
				const updatedConversation: ConversationType = {
					...prevConversation,
					messages: [...prevConversation.messages, newMessage],
				};
				
				return updatedConversation;
			}
		);
		queryClient.setQueryData(
			["conversations", user?.uid as string],
			(prevConversations: ConversationType[]) => {
				const updatedConversations = prevConversations.map(
					(conversation) => {
						if (conversation._id === selectedConversationID) {
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
						conversation._id === selectedConversationID
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
		await useCreateNewMessageMutation.mutate();
		setMessage("");
	};
	return (
		<>
			<TextInput
				placeholder="Start a new meessage"
				mb={-10}
				value={message}
				size="md"
				onChange={(event) => setMessage(event.currentTarget.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSubmit();
					}
				}}
				rightSection={
					<ActionIcon
						size={28}
						radius="xl"
						color={"#8d7ac8"}
						variant="filled"
						disabled={message === ""}
						onClick={handleSubmit}
					>
						<IconArrowRight
							style={{ width: rem(18), height: rem(18) }}
							stroke={2}
							color="#242424"
						/>
					</ActionIcon>
				}
				radius={"md"}
				classNames={{
					input: styles.input,
				}}
			/>
		</>
	);
};

export default ConversationInput;
