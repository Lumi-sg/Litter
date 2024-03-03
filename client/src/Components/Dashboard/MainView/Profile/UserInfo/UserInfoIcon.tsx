import { Avatar, Text, Group } from "@mantine/core";
import classes from "./UserInfoIcons.module.css";
import { convertEmailToUsername } from "../../../../../Helpers/convertEmailToUsername";
import UserType from "../../../../../Types/User";

type UserInfoIconsProps = {
	userData: UserType | undefined;
	isLoading: boolean;
};

export function UserInfoIcons({ userData, isLoading }: UserInfoIconsProps) {
	return (
		<div>
			<Group wrap="nowrap">
				<Avatar src={userData?.pictureURL} size={60} radius="xl" />
				<div>
					<Text fz="lg" fw={700} className={classes.name} c={"white"}>
						{userData?.displayName}
					</Text>

					<Group wrap="nowrap" gap={10} mt={3}>
						<Text fz="xs" c="dimmed">
							{userData?.username}
						</Text>
					</Group>
				</div>
			</Group>
		</div>
	);
}
