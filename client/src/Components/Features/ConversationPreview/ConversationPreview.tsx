import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	Divider,
	Menu,
	Stack,
	Flex,
	Center,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { Trash } from "tabler-icons-react";
import classes from "./ConversationPreview.module.css";
import { ConversationType } from "../../../Types/Conversation";
import { Link, useNavigate } from "react-router-dom";
import formatTimeStamp from "../../../Helpers/formatTimeStamp";
import { getOtherUserInConversation } from "../../../Helpers/getOtherUserInConversation";
import { useDeleteConversation } from "../../../Hooks/Conversation Hooks/useDeleteConversation";
import { useSelectedConversationStore } from "../../../Stores/selectedConversationStore";
import { useSocketStore } from "../../../Stores/socketStore";
import { useEffect, useState } from "react";
import { MessageType } from "../../../Types/Message";
import { useUserStore } from "../../../Stores/userStore";

type ConversationPreviewProps = {
	conversation: ConversationType;
};

const ConversationPreview = ({ conversation }: ConversationPreviewProps) => {
	const navigate = useNavigate();
	const { selectedConversationID, setSelectedConversationID } =
		useSelectedConversationStore();
	const { mutate: deleteConversation } = useDeleteConversation(
		conversation._id
	);
	const { socket } = useSocketStore();
	const { user } = useUserStore();
	const otherUser = getOtherUserInConversation(conversation.participants);

	const [lastMessage, setLastMessage] = useState<MessageType | null>(null);

	const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
		deleteConversation();
	};

	useEffect(() => {
		const handleNewMessage = (
			newMessage: MessageType,
			conversationID: string
		) => {
			// Check if the conversation ID matches
			if (conversationID === conversation._id) {
				setLastMessage(newMessage);
			}
		};

		socket?.on("receiveNewMessage", handleNewMessage);

		return () => {
			socket?.off("receiveNewMessage", handleNewMessage);
		};
	}, [conversation._id]);

	return (
		<>
			<UnstyledButton
				className={
					selectedConversationID === conversation._id
						? classes.highlightUser
						: classes.user
				}
				h={80}
				onClick={() => {
					setSelectedConversationID(conversation._id);
					navigate(`/dashboard/messages/${conversation._id}`);
				}}
			>
				<Flex
					ml={10}
					w={"100%"}
					mih={80}
					gap={0}
					align={"center"}
					justify={"space-between"}
				>
					<Group className="Avatarstuff" miw={150} w={"50%"}>
						<Avatar
							src={otherUser?.pictureURL}
							radius="xl"
							size={45}
							mr={10}
							component={Link}
							to={`/dashboard/profile/${otherUser?.username}`}
						/>

						<Stack gap={-"50%"} ml={-18}>
							<Text
								size="md"
								fw={700}
								c={"white"}
								component={Link}
								to={`/dashboard/profile/${otherUser?.username}`}
							>
								{otherUser?.displayName}
								<Text span c={"dimmed"} size="sm" ml={3}>
									{otherUser?.username}
								</Text>
							</Text>
							<Text
								c={
									lastMessage?.senderFirebaseID === user?.uid
										? "dimmed"
										: "white"
								}
								size="md"
							>
								{lastMessage
									? lastMessage.content.slice(0, 13) + " ..."
									: ""}
							</Text>
						</Stack>
					</Group>
					<Center>
						<Divider orientation="vertical" h={60} />
					</Center>
					<Text c="dimmed" size="xs" ta={"left"} ml={5}>
						{lastMessage
							? formatTimeStamp(lastMessage.timestamp.toString())
							: formatTimeStamp(
									conversation.createdAt.toString()
							  )}
					</Text>
					<Group justify="flex-start" mr={10}>
						<Menu position="right">
							<Menu.Target>
								<IconDots
									className={classes.dotsIcon}
									onClick={(event) => {
										event.stopPropagation();
										event.preventDefault();
									}}
								/>
							</Menu.Target>
							<Menu.Dropdown
								bg={"#242424"}
								style={{ border: "1px solid #8d7ac8" }}
							>
								<Menu.Item
									onClick={(event) => handleMenuClick(event)}
									leftSection={
										<Trash color="red" size={20} />
									}
								>
									<Text c={"#eb0303"}>
										Delete Conversation
									</Text>
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Flex>
			</UnstyledButton>
			<Divider />
		</>
	);
};

export default ConversationPreview;
