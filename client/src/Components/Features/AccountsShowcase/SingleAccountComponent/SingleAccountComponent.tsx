import { Avatar, Text, Group, Button } from "@mantine/core";
import classes from "./UserInfoIcons.module.css";
import { useUserStore } from "../../../../Stores/userStore";
import { useFollowUser } from "../../../../Hooks/useFollowUser";
import { useUnfollowUser } from "../../../../Hooks/useUnfollowUser";
import FirebaseUserType from "../../../../Types/User";

type UserInfoIconsProps = {
	randomUser: FirebaseUserType | undefined;
	currentlyLoggedInUser: FirebaseUserType | undefined;
};

export function SingleAccountComponent({
	randomUser,
	currentlyLoggedInUser,
}: UserInfoIconsProps) {
	const { user } = useUserStore();
	const { mutate: followUser } = useFollowUser(
		randomUser?.username as string
	);
	const { mutate: unfollowUser } = useUnfollowUser(
		randomUser?.username as string
	);

	const isCurrentUserFollowingTarget = randomUser?.followers.some(
		(follower) => {
			if (follower === currentlyLoggedInUser?._id.toString()) {
				return true;
			}
			return false;
		}
	);

	const handleFollowClick = () => {};
	return (
		<div>
			<Group
				wrap="nowrap"
				style={{ border: "1px solid #424242", borderRadius: 10 }}
				p={10}
				justify="space-between"
			>
				<Group>
					<Avatar
						src={randomUser?.pictureURL}
						size={60}
						radius="50%"
					/>
					<div>
						<Text
							fz="lg"
							fw={500}
							className={classes.name}
							c={"white"}
						>
							{randomUser?.displayName}
						</Text>

						<Group wrap="nowrap" gap={10} mt={3}>
							<Text fz="xs" c="dimmed">
								{randomUser?.username}
							</Text>
						</Group>
					</div>
				</Group>
				<div>
					<Button
						onClick={handleFollowClick}
						variant="outline"
						color={"violet"}
						size="xs"
					>
						{isCurrentUserFollowingTarget ? "Unfollow" : "Follow"}
					</Button>
				</div>
			</Group>
		</div>
	);
}
