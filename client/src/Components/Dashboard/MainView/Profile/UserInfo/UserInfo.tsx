import { Card, Text, Group, Button, Center } from "@mantine/core";
import classes from "./UserCardImage.module.css";
import { Loader } from "@mantine/core";
import { UserInfoIcons } from "./UserInfoIcon";
import UserType from "../../../../../Types/User";
import { useUserStore } from "../../../../../Stores/userStore";
import { useFollowUser } from "../../../../../Hooks/Follow Hooks/useFollowUser.ts";
import { useUnfollowUser } from "../../../../../Hooks/Follow Hooks/useUnfollowUser.ts";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet.tsx";
import { useCreateConversation } from "../../../../../Hooks/Conversation Hooks/useCreateConversation.ts";
type UserCardImageProps = {
	profileUserData: UserType | undefined;
	currentUserData: UserType | undefined;
	isLoading: boolean;
};

export function UserCardImage({
	profileUserData,
	currentUserData,
	isLoading,
}: UserCardImageProps) {
	const stats = [
		{ value: profileUserData?.followerCount, label: "Followers" },
		{ value: profileUserData?.followCount, label: "Following" },
		{ value: profileUserData?.tweetCount, label: "Tweets" },
	];
	const items = stats.map((stat) => (
		<div key={stat.label}>
			<Text ta="center" fz="lg" fw={500} c={"white"}>
				{stat.value}
			</Text>
			<Text ta="center" fz="sm" c="dimmed" lh={1}>
				{stat.label}
			</Text>
		</div>
	));
	const { user } = useUserStore();
	const { mutate: followUser } = useFollowUser(
		profileUserData?.username as string
	);
	const { mutate: unfollowUser } = useUnfollowUser(
		profileUserData?.username as string
	);

	const { mutate: createConversation, isPending } = useCreateConversation(
		profileUserData?.username as string
	);

	const isCurrentUserFollowingTarget = profileUserData?.followers.some(
		(follower) => {
			if (follower === currentUserData?._id.toString()) {
				return true;
			}
			return false;
		}
	);

	const isLoggedInUserOwnerOfProfile =
		profileUserData?._id.toString() === currentUserData?._id.toString();

	const handleFollowClick = () => {
		if (user) {
			if (isCurrentUserFollowingTarget) {
				unfollowUser();
			} else {
				followUser();
			}
		}
	};

	return isLoading ? (
		<LoadingTweet />
	) : (
		<Card
			withBorder
			radius="md"
			className={classes.card}
			h={"100%"}
			w={"100%"}
			bg={"#242424"}
			style={{ border: "1px solid #8d7ac8" }}
		>
			<Center>
				<UserInfoIcons
					userData={profileUserData}
					isLoading={isLoading}
				/>
			</Center>
			<Group mt="md" justify="center" gap={30}>
				{items}
			</Group>
			<Group justify="center">
				<Button
					w={"25%"}
					radius="md"
					mt="xl"
					size="md"
					variant="outline"
					color="violet"
					onClick={handleFollowClick}
					disabled={isLoggedInUserOwnerOfProfile}
				>
					{isCurrentUserFollowingTarget ? "Unfollow" : "Follow"}
				</Button>
				<Button
					w={"25%"}
					radius="md"
					mt="xl"
					size="md"
					variant="outline"
					color="violet"
					disabled={isLoggedInUserOwnerOfProfile}
					onClick={() => createConversation()}
				>
					{isPending ? <Loader color="violet" /> : "Message"}
				</Button>
			</Group>
		</Card>
	);
}
