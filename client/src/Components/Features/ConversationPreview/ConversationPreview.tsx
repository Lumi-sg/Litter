import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	rem,
	Divider,
	Menu,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { Trash } from "tabler-icons-react";
import classes from "./ConversationPreview.module.css";
import { useUserStore } from "../../../Stores/userStore";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { displayNotification } from "../../../Helpers/displayNotification";

const ConversationPreview = () => {
	const { user } = useUserStore();

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
			<UnstyledButton className={classes.user} h={80} w={"100%"}>
				<Group ml={10}>
					<Avatar src={user?.photoURL} radius="xl" />

					<div style={{ flex: 1 }}>
						<Text size="md" fw={700} c={"white"}>
							{user?.displayName}
						</Text>

						<Text c="dimmed" size="xs">
							{convertEmailToUsername(user?.email as string)}
						</Text>
					</div>
					<Menu position="left">
						<Menu.Target>
							<IconDots
								className={classes.dotsIcon}
								onClick={(event) => event.stopPropagation()}
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
								leftSection={<Trash color="red" size={20} />}
							>
								<Text c={"#eb0303"}>Delete Conversation</Text>
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</UnstyledButton>
			<Divider />
		</>
	);
};

export default ConversationPreview;
