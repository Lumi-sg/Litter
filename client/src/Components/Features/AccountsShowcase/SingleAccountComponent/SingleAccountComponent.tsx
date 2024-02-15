import { Avatar, Text, Group, Button } from "@mantine/core";
import classes from "./UserInfoIcons.module.css";
import { useUserStore } from "../../../../Stores/userStore";
import { convertEmailToUsername } from "../../../../Helpers/convertEmailToUsername";
import { displayNotification } from "../../../../Helpers/displayNotification";

export function SingleAccountComponent() {
	const { user } = useUserStore();

	const handleFollowClick = () => {
		displayNotification(
			"Follow",
			"followed",
			"#3cc94d",
			`${user?.displayName}'s`,
			"account"
		);
	};
	return (
		<div>
			<Group
				wrap="nowrap"
				style={{ border: "1px solid #424242", borderRadius: 10 }}
				p={10}
			>
				<Avatar src={user?.photoURL} size={60} radius="50%" />
				<div>
					<Text fz="lg" fw={500} className={classes.name} c={"white"}>
						{user?.displayName}
					</Text>

					<Group wrap="nowrap" gap={10} mt={3}>
						<Text fz="xs" c="dimmed">
							{convertEmailToUsername(user?.email as string)}
						</Text>
					</Group>
				</div>
				<div>
					<Button
						onClick={handleFollowClick}
						variant="outline"
						color={"violet"}
						size="xs"
						ml={30}
					>
						Follow
					</Button>
				</div>
			</Group>
		</div>
	);
}
