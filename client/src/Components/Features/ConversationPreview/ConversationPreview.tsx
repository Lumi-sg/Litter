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
import classes from "./ConversationPreview.module.css";
import { useUserStore } from "../../../Stores/userStore";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";

const ConversationPreview = () => {
	const { user } = useUserStore();

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
					<Menu>
						<Menu.Target>
							<IconDots className={classes.dotsIcon} />
						</Menu.Target>
					</Menu>
				</Group>
			</UnstyledButton>
			<Divider />
		</>
	);
};

export default ConversationPreview;
