import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	Divider,
	Menu,
	Stack,
	Flex,
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
			<UnstyledButton className={classes.user} h={80} w={"97.5%"}>
				<Flex ml={10} w={"100%"} gap={0} align={"center"}>
					<Avatar
						src={user?.photoURL}
						radius="xl"
						size={45}
						mr={10}
					/>

					<Stack gap={-"50%"}>
						<Group justify="space-around">
							<Text size="md" fw={700} c={"white"}>
								{user?.displayName}
							</Text>

							<Text c="dimmed" size="sm" ta={"left"}>
								{convertEmailToUsername(user?.email as string)}
							</Text>
							<Divider orientation="vertical" />

							<Text c="dimmed" size="sm" ta={"left"}>
								Jan 01, 2022
							</Text>
						</Group>
						<Text c={"dimmed"} size="md">
							This is a preview
						</Text>
					</Stack>
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
				</Flex>
			</UnstyledButton>
			<Divider />
		</>
	);
};

export default ConversationPreview;
