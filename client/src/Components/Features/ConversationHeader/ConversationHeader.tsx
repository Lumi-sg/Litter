import {
	Group,
	Avatar,
	Text,
	Divider,
	Menu,
	Button,
	UnstyledButton,
} from "@mantine/core";
import {
	Menu as MenuIcon,
	Dots,
	UserPlus,
	UserMinus,
	Ban,
	Checkbox,
} from "tabler-icons-react";
import { useUserStore } from "../../../Stores/userStore";
import { displayNotification } from "../../../Helpers/displayNotification";

const ConversationHeader = () => {
	const { user } = useUserStore();

	const handleDotsClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		console.log("dots clicked");
	};

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
			default:
				return;
		}
	};
	return (
		<>
			<Group justify="space-between">
				<Group>
					<Avatar src={user?.photoURL} size={40} radius="xl" />
					<Text c={"white"} size="md" fw={700}>
						{user?.displayName}
					</Text>
				</Group>

				<Menu position="bottom">
					<Menu.Target>
						<UnstyledButton onClick={(e) => handleOptionsClick(e)}>
							<MenuIcon size={28} color="#8d7ac8" />
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
							onClick={(event) => handleMenuClick(event, "Block")}
							leftSection={<Ban color="white" size={20} />}
						>
							<Text c={"white"}>Block @user</Text>
						</Menu.Item>
						<Menu.Item
							onClick={(event) =>
								handleMenuClick(event, "Unblock")
							}
							leftSection={<Checkbox color="white" size={20} />}
						>
							<Text c={"white"}>Unblock @user</Text>
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
			<Divider />
		</>
	);
};

export default ConversationHeader;
