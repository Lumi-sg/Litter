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
import { displayNotification } from "../../../Helpers/displayNotification";
import { useParentTweetStoreAuthor } from "../../../Stores/parentTweetStoreAuthor";
import TweetReplyModal from "../TweetReplyModal/TweetReplyModal";
import { modals } from "@mantine/modals";
import { TweetType } from "../../../Types/Tweet";
import { Link } from "react-router-dom";
import { useLikeTweet } from "../../../Hooks/useLikeTweet";
import { useUnlikeTweet } from "../../../Hooks/useUnlikeTweet";
type TweetComponentProps = {
	passedInStyles: React.CSSProperties;
	tweet: TweetType;
};

export function TweetComponent({ passedInStyles, tweet }: TweetComponentProps) {
	const { user } = useUserStore();
	const { setSelectedComponent } = useComponentStore();
	const { setParentTweetAuthor } = useParentTweetStoreAuthor();
	const { mutate: mutateLike } = useLikeTweet(tweet);

	const { mutate: mutateUnlike } = useUnlikeTweet(tweet);

	const handleDotsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		console.log("dots clicked");
	};

	const handleReplyClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		setParentTweetAuthor(user);
		modals.open({
			children: <TweetReplyModal />,
			size: 700,
			withCloseButton: false,
			radius: "md",

			onClose: () => {
				setParentTweetAuthor(null);
			},
		});
	};

	const handleActionClick = (
		e: React.MouseEvent<HTMLDivElement>,
		action: string
	) => {
		e.stopPropagation();

		switch (action) {
			case "Like":
				const userHasLiked = tweet.likes.includes(user?.uid as string);
				if (userHasLiked) {
					mutateUnlike();

					return;
				}
				mutateLike();

				return;
			case "Bookmark":
				displayNotification(
					action,
					"bookmarked",
					"#3cc94d",
					`${tweet.authorDisplayName as string}'s`,
					"tweet"
				);
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
		switch (action) {
			case "Follow":
				displayNotification(
					action,
					"followed",
					"#3cc94d",
					user?.displayName as string,
					"account"
				);
				return;
			case "Unfollow":
				displayNotification(
					action,
					"unfollowed",
					"red",
					user?.displayName as string,
					"account"
				);
				return;
			case "Block":
				displayNotification(
					action,
					"blocked",
					"red",
					user?.displayName as string,
					"account"
				);
				return;
			case "Unblock":
				displayNotification(
					action,
					"unblocked",
					"green",
					user?.displayName as string,
					"account"
				);
				return;
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
							</Group>

							<Text fz="xs" c="dimmed">
								{tweet.timestamp.toString()}
							</Text>
						</div>
					</Group>
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
							<Menu.Item
								onClick={(event) =>
									handleMenuClick(event, "Unfollow")
								}
								leftSection={
									<UserMinus color="white" size={20} />
								}
							>
								<Text c={"white"}>
									Unfollow {tweet.authorUsername}
								</Text>
							</Menu.Item>
							<Menu.Item
								onClick={(event) =>
									handleMenuClick(event, "Block")
								}
								leftSection={<Ban color="white" size={20} />}
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
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
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
						<Group
							gap={2}
							className={styles.messageicon}
							onClick={(e) => handleReplyClick(e)}
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
							onClick={(e) => handleActionClick(e, "Like")}
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
							onClick={(e) => handleActionClick(e, "Bookmark")}
						>
							<Bookmark
								size={22}
								className={styles.bookmarkActualIcon}
							/>
							<Text c={"white"} size="sm" fw={600}>
								{tweet.bookmarkCount}
							</Text>
						</Group>
					</Group>
				</TypographyStylesProvider>
			</Paper>
			{/* <Modal
				opened={opened}
				onClose={close}
				size={"35%"}
				withCloseButton={false}
			>
				<TweetModal />
			</Modal> */}
		</>
	);
}
