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
import { ConversationType } from "../../../Types/Conversation";
import UserType from "../../../Types/User";

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
			<UnstyledButton className={classes.user} h={80}>
				<Flex
					ml={10}
					w={"100%"}
					gap={0}
					align={"center"}
					justify={"space-between"}
				>
					<Flex>
						<Avatar
							src={otherUser?.pictureURL}
							radius="xl"
							size={45}
							mr={10}
						/>

						<Stack gap={-"50%"}>
							<Group justify="space-around">
								<Text size="md" fw={700} c={"white"}>
									{otherUser?.displayName}
									<Text span c={"dimmed"} size="sm" ml={3}>
										{otherUser?.username}
									</Text>
								</Text>

								<Divider orientation="vertical" />

								<Text c="dimmed" size="xs" ta={"left"}>
									01/01/2022
								</Text>
							</Group>
							<Text c={"white"} size="md">
								This is a preview
							</Text>
						</Stack>
					</Flex>
					<Stack justify="flex-start" mr={10}>
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
					</Stack>
				</Flex>
			</UnstyledButton>
			<Divider />
		</>
	);
};

export default ConversationPreview;
