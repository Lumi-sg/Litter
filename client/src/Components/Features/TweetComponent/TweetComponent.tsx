import {
	Text,
	Avatar,
	Group,
	TypographyStylesProvider,
	Paper,
	Button,
	Menu,
	rem,
} from "@mantine/core";
import classes from "./TweetComponent.module.css";
import styles from "./TweetComponent.module.css";
import { useUserStore } from "../../../Stores/userStore";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { MessageCircle2, Heart, Bookmark, Dots } from "tabler-icons-react";
import { useComponentStore } from "../../../Stores/componentStore";

type TweetComponentProps = {
	passedInStyles: React.CSSProperties;
};

export function TweetComponent({ passedInStyles }: TweetComponentProps) {
	const { user } = useUserStore();
	const { setSelectedComponent } = useComponentStore();

	const handleDotsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		console.log("dots clicked");
	};

	const handleActionClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		console.log("action clicked");
	};

	return (
		<Paper
			withBorder
			radius="md"
			className={classes.comment + " " + styles.comment}
			onClick={() => setSelectedComponent("SinglePost")}
			style={{ ...passedInStyles }}
		>
			<Group justify="space-between">
				<Group>
					<Avatar
						src={user?.photoURL}
						alt={user?.displayName as string}
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
								{user?.displayName as string}
							</Text>
							<Text fz="xs" c="#b097fcce">
								{convertEmailToUsername(user?.email as string)}
							</Text>
						</Group>

						<Text fz="xs" c="dimmed">
							10 minutes ago
						</Text>
					</div>
				</Group>
				<Menu>
					<Menu.Target>
						<Button
							color="violet"
							variant="subtle"
							size="xs"
							onClick={(e) => handleDotsClick(e)}
						>
							<Dots />
						</Button>
					</Menu.Target>
				</Menu>
			</Group>
			<TypographyStylesProvider className={classes.body}>
				<Text c="white">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Dolore, saepe. Porro, laborum sequi dolores, sit
					consequuntur laboriosam, voluptas quia odit rerum pariatur
					voluptatem similique dolorem amet sint dicta ut veritatis.
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
						onClick={(e) => handleActionClick(e)}
					>
						<MessageCircle2
							size={22}
							className={styles.messageActualIcon}
						/>
						<Text c={"white"} size="sm" fw={600}>
							53
						</Text>
					</Group>
					<Group
						gap={2}
						className={styles.hearticon}
						onClick={(e) => handleActionClick(e)}
					>
						<Heart size={22} className={styles.heartActualIcon} />
						<Text c={"white"} size="sm" fw={600}>
							100
						</Text>
					</Group>
					<Group
						gap={0}
						className={styles.bookmarkicon}
						onClick={(e) => handleActionClick(e)}
					>
						<Bookmark
							size={22}
							className={styles.bookmarkActualIcon}
						/>
						<Text c={"white"} size="sm" fw={600}>
							17
						</Text>
					</Group>
				</Group>
			</TypographyStylesProvider>
		</Paper>
	);
}
