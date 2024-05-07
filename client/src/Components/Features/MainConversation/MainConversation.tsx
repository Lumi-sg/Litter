import { Center, Flex, ScrollArea, Stack } from "@mantine/core";
import MessageCard from "../MessageCard/MessageCard";
import { useRef, useEffect } from "react";
import styles from "./MainConversation.module.css";
import { ConversationType } from "../../../Types/Conversation";
import { useUserStore } from "../../../Stores/userStore";
import { useSocketStore } from "../../../Stores/socketStore";
import { MessageType } from "../../../Types/Message";
import { useQueryClient } from "@tanstack/react-query";
import { useSelectedConversationStore } from "../../../Stores/selectedConversationStore";
import { notifications } from "@mantine/notifications";
import { IconDots } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type MainConversationProps = {
	conversation: ConversationType;
};

const MainConversation = ({ conversation }: MainConversationProps) => {
	const scrollHere = useRef<HTMLDivElement>(null);
	const { user } = useUserStore();
	const { socket } = useSocketStore();
	const { selectedConversationID } = useSelectedConversationStore();

	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const handleScroll = () => {
		if (scrollHere.current) {
			scrollHere.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		handleScroll();
	}, []);

	useEffect(() => {
		handleScroll();
	}, [conversation]);

	useEffect(() => {
		socket?.on(
			"receiveNewMessage",
			(
				newMessage: MessageType,
				conversationID,
				senderUsername: string
			) => {
				if (newMessage.senderFirebaseID === user?.uid) {
					return;
				}
				if (conversationID !== selectedConversationID) {
					notifications.show({
						title: "New Message from " + senderUsername,
						message: newMessage.content,
						color: "violet",
						icon: <IconDots color="black" />,
						autoClose: 5000,
						onClick: () => {
							navigate(`/dashboard/messages/${conversationID}`);
							notifications.clean();
						}
					});
					return;
				}
				queryClient.setQueryData(
					["conversation", selectedConversationID],
					(prevConversation: ConversationType) => {
						// @ts-ignore
						const updatedConversation: ConversationType = {
							...prevConversation,
							messages: [
								...prevConversation.messages,
								newMessage,
							],
						};
						return updatedConversation;
					}
				);
				handleScroll();
				return;
			}
		);
	}, []);

	return (
		<Flex mr={5} gap={20} direction="column-reverse" h={"100%"} c={"white"}>
			<ScrollArea
				offsetScrollbars
				scrollbarSize={4}
				mah={"calc(100vh - 13.25rem)"}
				classNames={styles}
			>
				{conversation.messages.length === 0 && (
					<Center h={"100%"} w={"100%"}>
						Start your conversation!
					</Center>
				)}
				{conversation.messages.map((message) => (
					<Stack
						key={message.timestamp.toString()}
						align={
							message.senderFirebaseID === user?.uid
								? "flex-end"
								: "flex-start"
						}
						mr={10}
					>
						<MessageCard
							key={message._id}
							message={message}
							isLoggedInUserMessage={
								message.senderFirebaseID === user?.uid
							}
						/>
					</Stack>
				))}

				<div ref={scrollHere}></div>
			</ScrollArea>
		</Flex>
	);
};

export default MainConversation;
