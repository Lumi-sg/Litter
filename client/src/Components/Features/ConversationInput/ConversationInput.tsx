import { ActionIcon, TextInput, rem } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./ConversationInput.module.css";
import { useState, useEffect } from "react";
import { ConversationType } from "../../../Types/Conversation";
import { useCreateNewMessage } from "../../../Hooks/Conversation Hooks/useCreateNewMessage";
import { getOtherUserInConversation } from "../../../Helpers/getOtherUserInConversation";
import { useSocketStore } from "../../../Stores/socketStore";
import { useSelectedConversationStore } from "../../../Stores/selectedConversationStore";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../../Stores/userStore";

type ConversationInputProps = {
	conversation: ConversationType;
};

const ConversationInput = ({ conversation }: ConversationInputProps) => {
	const otherUser = getOtherUserInConversation(conversation.participants);
	const [message, setMessage] = useState("");
	const { socket } = useSocketStore();
	const { selectedConversationID } = useSelectedConversationStore();
	const { user } = useUserStore();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!socket || !selectedConversationID) return;
	})

	const useCreateNewMessageMutation = useCreateNewMessage(
		conversation._id,
		message,
		otherUser?.username as string
	);

	const handleSubmit = async () => {
		socket?.emit("newMessage", message, conversation._id, user?.uid);
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
