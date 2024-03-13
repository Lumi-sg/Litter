import {
	Group,
	Avatar,
	Text,
	Divider,
	Menu,
	UnstyledButton,
} from "@mantine/core";
import {
	Menu as MenuIcon,
	UserPlus,
	UserMinus,
	Ban,
	Checkbox,
	Trash,
} from "tabler-icons-react";
import { useUserStore } from "../../../Stores/userStore";
import { displayNotification } from "../../../Helpers/displayNotification";
import styles from "./ConversationHeader.module.css";
import { ConversationType } from "../../../Types/Conversation";
import { getOtherUserInConversation } from "../../../Helpers/getOtherUserInConversation";
import { useFollowUser } from "../../../Hooks/useFollowUser";
import { useUnfollowUser } from "../../../Hooks/useUnfollowUser";

type ConversationHeaderProps ={
	conversation: ConversationType 
}

const ConversationHeader = ({ conversation }: ConversationHeaderProps ) => {
	const { user } = useUserStore();

	const otherUser = getOtherUserInConversation(conversation.participants);


	const handleOptionsClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
	};
	const handleMenuClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: string
	) => {
		e.stopPropagation();
		switch (action) {
			case "Follow":
				displayNotification(
					action,
					"followed",
					"#3cc94d",
					(user?.displayName as string) + `'s`,

					"account"
				);
				return;
			case "Unfollow":
				displayNotification(
					action,
					"unfollowed",
					"red",
					(user?.displayName as string) + `'s`,

					"account"
				);
				return;
			case "Block":
				displayNotification(
					action,
					"blocked",
					"red",
					(user?.displayName as string) + `'s`,

					"account"
				);
				return;
			case "Unblock":
				displayNotification(
					action,
					"unblocked",
					"green",
					(user?.displayName as string) + `'s`,
					"account"
				);
				return;
			case "Leave":
				displayNotification(
					action,
					"left the conversation with",
					"red",
					user?.displayName as string,
					""
				);
				return;
			default:
				return;
		}
	};
	return (
		<>
			<Group justify="space-between">
				<Group>
					<Avatar src={otherUser?.pictureURL} size={40} radius="xl" />
					<Text c={"white"} size="md" fw={700}>
						{otherUser?.displayName}
					</Text>
				</Group>

				<Menu position="bottom">
					<Menu.Target>
						<UnstyledButton onClick={(e) => handleOptionsClick(e)}>
							<MenuIcon
								size={28}
								color="#8d7ac8"
								className={styles.menuIcon}
							/>
						</UnstyledButton>
					</Menu.Target>
					<Menu.Dropdown
						bg={"#242424"}
						style={{ border: "1px solid #8d7ac8" }}
					>
						<Menu.Item
							onClick={(event) =>
								handleMenuClick(event, "Follow")
							}
							leftSection={<UserPlus color="white" size={20} />}
						>
							<Text c={"white"}>Follow</Text>
						</Menu.Item>
						<Menu.Item
							onClick={(event) =>
								handleMenuClick(event, "Unfollow")
							}
							leftSection={<UserMinus color="white" size={20} />}
						>
							<Text c={"white"}>Unfollow</Text>
						</Menu.Item>

						<Menu.Item
							onClick={(event) => handleMenuClick(event, "Leave")}
							leftSection={<Trash color="red" size={20} />}
						>
							<Text c={"#eb0303"}>Delete Conversation</Text>
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
			<Divider />
		</>
	);
};

export default ConversationHeader;
