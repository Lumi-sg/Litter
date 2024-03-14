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
	Trash,
} from "tabler-icons-react";
import { useUserStore } from "../../../Stores/userStore";
import styles from "./ConversationHeader.module.css";
import { ConversationType } from "../../../Types/Conversation";
import { getOtherUserInConversation } from "../../../Helpers/getOtherUserInConversation";
import { useFollowUser } from "../../../Hooks/Follow Hooks/useFollowUser";
import { useUnfollowUser } from "../../../Hooks/Follow Hooks/useUnfollowUser";
import { useProfileGet } from "../../../Hooks/User Hooks/useProfileGet";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { Link } from "react-router-dom";

type ConversationHeaderProps = {
	conversation: ConversationType;
};

const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {
	const { user } = useUserStore();
	const { data: loggedInUser } = useProfileGet(
		convertEmailToUsername(user?.email as string)
	);

	const otherUser = getOtherUserInConversation(conversation.participants);
	const { mutate: followUser } = useFollowUser(otherUser?.username as string);
	const { mutate: unfollowUser } = useUnfollowUser(
		otherUser?.username as string
	);

	const isLoggedInUserFollowingOtherUser = loggedInUser?.following.includes(
		otherUser?._id
	);

	return (
		<>
			<Group justify="space-between">
				<Group>
					<Avatar
						src={otherUser?.pictureURL}
						size={40}
						radius="xl"
						component={Link}
						to={`/dashboard/profile/${otherUser?.username}`}
					/>
					<Text c={"white"} size="md" fw={700}>
						{otherUser?.displayName}
					</Text>
				</Group>

				<Menu position="bottom">
					<Menu.Target>
						<UnstyledButton>
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
						{!isLoggedInUserFollowingOtherUser ? (
							<Menu.Item
								onClick={() => followUser()}
								leftSection={
									<UserPlus color="white" size={20} />
								}
							>
								<Text c={"white"}>
									Follow {otherUser?.username}
								</Text>
							</Menu.Item>
						) : (
							<Menu.Item
								onClick={() => unfollowUser()}
								leftSection={
									<UserMinus color="white" size={20} />
								}
							>
								<Text c={"white"}>
									Unfollow {otherUser?.username}
								</Text>
							</Menu.Item>
						)}

						<Menu.Item
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
