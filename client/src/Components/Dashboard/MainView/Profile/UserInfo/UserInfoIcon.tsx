import { Avatar, Text, Group } from "@mantine/core";
import classes from "./UserInfoIcons.module.css";
import UserType from "../../../../../Types/User";
import { Link } from "react-router-dom";

type UserInfoIconsProps = {
	userData: UserType | undefined;
	isLoading: boolean;
};

export function UserInfoIcons({ userData }: UserInfoIconsProps) {
	return (
		<div>
			<Group wrap="nowrap">
				<Avatar src={userData?.pictureURL} size={60} radius="xl" />
				<div>
					<Text fz="lg" fw={700} className={classes.name} c={"white"}>
						{userData?.displayName}
					</Text>

					<Group wrap="nowrap" gap={10} mt={3}>
						<Text
							component={Link}
							to={`/dashboard/profile/${userData?.username}`}
							fz="xs"
							c="dimmed"
							style={{ textDecoration: "none" }}
						>
							{userData?.username}
						</Text>
					</Group>
				</div>
			</Group>
		</div>
	);
}
