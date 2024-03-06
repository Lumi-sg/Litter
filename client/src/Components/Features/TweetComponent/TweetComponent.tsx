import {
	Text,
	Avatar,
	Group,
	TypographyStylesProvider,
	Paper,
	Button,
	Menu,
} from "@mantine/core";
import classes from "./TweetComponent.module.css";
import styles from "./TweetComponent.module.css";
import { useUserStore } from "../../../Stores/userStore";
import {
	MessageCircle2,
	Heart,
	Bookmark,
	Dots,
	UserPlus,
	UserMinus,
	Ban,
	Checkbox,
} from "tabler-icons-react";
import { useComponentStore } from "../../../Stores/componentStore";
import { useParentTweetStoreAuthor } from "../../../Stores/parentTweetStoreAuthor";
import TweetReplyModal from "../TweetReplyModal/TweetReplyModal";
import { modals } from "@mantine/modals";
import { TweetType } from "../../../Types/Tweet";
import { Link } from "react-router-dom";
import { useLikeTweet } from "../../../Hooks/useLikeTweet";
import { useUnlikeTweet } from "../../../Hooks/useUnlikeTweet";
import { useBookmarkTweet } from "../../../Hooks/useBookmarkTweet";
import { useRemoveBookmarkTweet } from "../../../Hooks/useRemoveBookmark";
import { useFollowUser } from "../../../Hooks/useFollowUser";
import { useUnfollowUser } from "../../../Hooks/useUnfollowUser";
import { useProfileGet } from "../../../Hooks/useProfileGet";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
type TweetComponentProps = {
	passedInStyles: React.CSSProperties;
	tweet: TweetType;
	isModal?: boolean;
};

export function TweetComponent({
	passedInStyles,
	tweet,
	isModal = false,
}: TweetComponentProps) {
	const { user } = useUserStore();
	const { setSelectedComponent } = useComponentStore();
	const { setParentTweetAuthor } = useParentTweetStoreAuthor();
	const { mutate: mutateLike } = useLikeTweet(tweet);
	const { mutate: mutateUnlike } = useUnlikeTweet(tweet);
	const { mutate: mutateBookmark } = useBookmarkTweet(tweet);
	const { mutate: mutateRemoveBookmark } = useRemoveBookmarkTweet(tweet);
	const { mutate: mutateFollowUser } = useFollowUser(tweet.author.username);
	const { mutate: mutateUnfollowUser } = useUnfollowUser(
		tweet.author.username
	);
	const { data: loggedInUser } = useProfileGet(
		convertEmailToUsername(user?.email as string)
	);

	const handleDotsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const isCurrentUserFollowingTarget = tweet.author.followers.some(
		(follower) => {
			if (follower._id === loggedInUser?.id) {
				return true;
			}
			return false;
		}
	);

	const isLoggedInUserAuthorOfTweet = tweet.firebaseID === user?.uid;

	const handleActionClick = (
		e: React.MouseEvent<HTMLDivElement>,
		action: string
	) => {
		e.stopPropagation();
		e.preventDefault();

		switch (action) {
			case "Reply":
				console.log("Replying...");
				modals.open({
					children: <TweetReplyModal tweet={tweet} />,
					size: 700,
					withCloseButton: false,
					radius: "md",
				});
				return;
			case "Like":
				const userHasLiked = tweet.likes.includes(user?.uid as string);
				if (userHasLiked) {
					mutateUnlike();

					return;
				}
				mutateLike();

				return;
			case "Bookmark":
				const userHasBookmarked = tweet.bookmarks.includes(
					user?.uid as string
				);
				if (userHasBookmarked) {
					mutateRemoveBookmark();
					return;
				}
				mutateBookmark();
				return;
			default:
				return;
		}
	};

	const handleMenuClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		action: string
	) => {
		e.stopPropagation();
		e.preventDefault();
		switch (action) {
			case "Follow":
				mutateFollowUser();
				return;
			case "Unfollow":
				mutateUnfollowUser();
				return;
			// case "Block":
			// 	displayNotification(
			// 		action,
			// 		"blocked",
			// 		"red",
			// 		user?.displayName as string,
			// 		"account"
			// 	);
			// 	return;
			// case "Unblock":
			// 	displayNotification(
			// 		action,
			// 		"unblocked",
			// 		"green",
			// 		user?.displayName as string,
			// 		"account"
			// 	);
			// 	return;
			default:
				return;
		}
	};

	return (
		<>
			<Paper
				withBorder
				radius="md"
				className={classes.comment + " " + styles.comment}
				onClick={() => {
					setSelectedComponent("SinglePost");
					setParentTweetAuthor(user);
				}}
				style={{ ...passedInStyles }}
				component={Link}
				to={`/dashboard/tweet/${tweet._id}`}
			>
				<Group justify="space-between">
					<Group>
						<Avatar
							src={tweet.authorPictureURL}
							alt={tweet.authorDisplayName as string}
							radius="xl"
						/>
						<div>
							<Group gap={5}>
								<Text
									fz="md"
									fw={700}
									c={"white"}
									style={{ cursor: "pointer" }}
								>
									{tweet.authorDisplayName as string}
								</Text>
								{isModal ? (
									<Text fz="xs" c="#b097fcce">
										{tweet.authorUsername as string}
									</Text>
								) : (
									<Text
										fz="xs"
										c="#b097fcce"
										component={Link}
										to={`/dashboard/profile/${
											tweet.authorUsername as string
										}`}
									>
										{tweet.authorUsername as string}
									</Text>
								)}
							</Group>

							<Text fz="xs" c="dimmed">
								{tweet.timestamp.toString()}
							</Text>
						</div>
					</Group>
					{!isModal && !isLoggedInUserAuthorOfTweet && (
						<Menu position="right-start">
							<Menu.Target>
								<Button
									color="violet"
									variant="subtle"
									size="xs"
									onClick={handleDotsClick}
								>
									<Dots />
								</Button>
							</Menu.Target>
							<Menu.Dropdown
								bg={"#242424"}
								style={{ border: "1px solid #8d7ac8" }}
							>
								{!isCurrentUserFollowingTarget ? (
									<Menu.Item
										onClick={(event) =>
											handleMenuClick(event, "Follow")
										}
										leftSection={
											<UserPlus color="white" size={20} />
										}
									>
										<Text c={"white"}>
											Follow {tweet.authorUsername}
										</Text>
									</Menu.Item>
								) : (
									<Menu.Item
										onClick={(event) =>
											handleMenuClick(event, "Unfollow")
										}
										leftSection={
											<UserMinus
												color="white"
												size={20}
											/>
										}
									>
										<Text c={"white"}>
											Unfollow {tweet.authorUsername}
										</Text>
									</Menu.Item>
								)}

								{/* <Menu.Item
									onClick={(event) =>
										handleMenuClick(event, "Block")
									}
									leftSection={
										<Ban color="white" size={20} />
									}
								>
									<Text c={"white"}>
										Block {tweet.authorUsername}
									</Text>
								</Menu.Item>
								<Menu.Item
									onClick={(event) =>
										handleMenuClick(event, "Unblock")
									}
									leftSection={
										<Checkbox color="white" size={20} />
									}
								>
									<Text c={"white"}>
										Unblock {tweet.authorUsername}
									</Text>
								</Menu.Item> */}
							</Menu.Dropdown>
						</Menu>
					)}
				</Group>
				<TypographyStylesProvider className={classes.body}>
					<Text c="white" style={{ wordWrap: "break-word" }}>
						{tweet.text}
					</Text>

					<Group
						justify="space-between"
						gap={"30%"}
						mt={10}
						align="center"
					>
						{!isModal && (
							<>
								<Group
									gap={2}
									className={styles.messageicon}
									onClick={(e) =>
										handleActionClick(e, "Reply")
									}
								>
									<MessageCircle2
										size={22}
										className={styles.messageActualIcon}
									/>
									<Text c={"white"} size="sm" fw={600}>
										{tweet.childrenCount}
									</Text>
								</Group>
								<Group
									gap={2}
									className={styles.hearticon}
									onClick={(e) =>
										handleActionClick(e, "Like")
									}
								>
									{tweet.likes.includes(user?.uid || "") ? (
										<Heart
											size={22}
											className={styles.heartActualIcon}
											color="#d279cb"
										/>
									) : (
										<Heart
											size={22}
											className={styles.heartActualIcon}
										/>
									)}

									<Text c={"white"} size="sm" fw={600}>
										{tweet.likesCount}
									</Text>
								</Group>
								<Group
									gap={0}
									className={styles.bookmarkicon}
									onClick={(e) =>
										handleActionClick(e, "Bookmark")
									}
								>
									{tweet.bookmarks.includes(
										user?.uid || ""
									) ? (
										<Bookmark
											size={22}
											className={
												styles.bookmarkActualIcon
											}
											color="#3cc94d"
										/>
									) : (
										<Bookmark
											size={22}
											className={
												styles.bookmarkActualIcon
											}
										/>
									)}

									<Text c={"white"} size="sm" fw={600}>
										{tweet.bookmarkCount}
									</Text>
								</Group>
							</>
						)}
					</Group>
				</TypographyStylesProvider>
			</Paper>
		</>
	);
}
