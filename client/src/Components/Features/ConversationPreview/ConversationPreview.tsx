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
import { useUserStore } from "../../../Stores/userStore";
import { displayNotification } from "../../../Helpers/displayNotification";
import { ConversationType } from "../../../Types/Conversation";
import UserType from "../../../Types/User";
import { Link } from "react-router-dom";
import formatTimeStamp from "../../../Helpers/formatTimeStamp";

type ConversationPreviewProps = {
	conversation: ConversationType;
};

const ConversationPreview = ({ conversation }: ConversationPreviewProps) => {
	const { user } = useUserStore();

	const getOtherUser = (conversationUsers: UserType[]) => {
		return conversationUsers.find(
			(conversationUser) => conversationUser.firebaseID !== user?.uid
		);
	};
	const otherUser = getOtherUser(conversation.participants);
	let lastMessage =
		conversation.messages.length > 0
			? conversation.messages[conversation.messages.length - 1]
			: null;

	const handleMenuClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: string
	) => {
		e.stopPropagation();
		switch (action) {
			case "Leave":
				displayNotification(
					action,
					"left conversation with",
					"red",
					user?.displayName as string,
					""
				);
		}
	};

	return (
		<>
			<UnstyledButton
				className={classes.user}
				h={80}
				component={Link}
				to={`/dashboard/messages/${conversation._id}`}
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
							<Text size="md" fw={700} c={"white"}>
								{otherUser?.displayName}
								<Text
									span
									c={"dimmed"}
									size="sm"
									ml={3}
									component={Link}
									to={`/dashboard/profile/${otherUser?.username}`}
								>
									{otherUser?.username}
								</Text>
							</Text>
							<Text c={"white"} size="md">
								{lastMessage
									? lastMessage.content.slice(0, 12) + "..."
									: "No messages yet"}
							</Text>
						</Stack>
					</Group>
					<Center>
					<Divider orientation="vertical" h={60}/>
					</Center>
					<Text c="dimmed" size="xs" ta={"left"} ml={5}>
						{lastMessage
							? formatTimeStamp(lastMessage.timestamp.toString())
							: "Mar 10, 2024, 12:14 AM"}
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
									onClick={(event) =>
										handleMenuClick(event, "Leave")
									}
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
