import { Avatar, Text, Group } from "@mantine/core";
import classes from "./UserInfoIcons.module.css";
import { useUserStore } from "../../../../../Stores/userStore";
import { convertEmailToUsername } from "../../../../../Helpers/convertEmailToUsername";

export function UserInfoIcons() {
	const { user } = useUserStore();
	return (
		<div>
			<Group wrap="nowrap">
				<Avatar src={user?.photoURL} size={60} radius="xl" />
				<div>
					<Text fz="lg" fw={500} className={classes.name}>
						{user?.displayName}
					</Text>

					<Group wrap="nowrap" gap={10} mt={3}>
						<Text fz="xs" c="dimmed">
							{convertEmailToUsername(user?.email as string)}
						</Text>
					</Group>
				</div>
			</Group>
		</div>
	);
}
