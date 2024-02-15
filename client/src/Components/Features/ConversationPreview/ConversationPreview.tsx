import { UnstyledButton, Group, Avatar, Text, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./ConversationPreview.module.css";
import { useUserStore } from "../../../Stores/userStore";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";

const ConversationPreview = () => {
	const { user } = useUserStore();

	return (
		<UnstyledButton className={classes.user} h={60} w={"95%"}>
			<Group>
				<Avatar
					src={user?.photoURL}
					radius="xl"
				/>

				<div style={{ flex: 1 }}>
					<Text size="sm" fw={500}>
						{user?.displayName}
					</Text>

					<Text c="dimmed" size="xs">
                        {convertEmailToUsername(user?.email as string)}
					</Text>
				</div>

				<IconChevronRight
					style={{ width: rem(14), height: rem(14) }}
					stroke={1.5}
				/>
			</Group>
		</UnstyledButton>
	);
};

export default ConversationPreview;
