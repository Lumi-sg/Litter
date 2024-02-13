import {
	Text,
	Avatar,
	Group,
	TypographyStylesProvider,
	Paper,
} from "@mantine/core";
import classes from "./TweetComponent.module.css";
import styles from "./TweetComponent.module.css";
import { useUserStore } from "../../../Stores/userStore";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { MessageCircle2, Heart, Bookmark } from "tabler-icons-react";

export function TweetComponent() {
	const { user } = useUserStore();

	return (
		<Paper
			withBorder
			radius="md"
			className={classes.comment + " " + styles.comment}
		>
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
					<Group gap={2} className={styles.messageicon}>
						<MessageCircle2 color={"#47a9d6"} size={22} className={styles.messageActualIcon}/>
						<Text c={"white"} size="sm"fw={600}>
							53
						</Text>
					</Group>
					<Group gap={2} className={styles.hearticon}>
						<Heart size={22} color="#d279cb" className={styles.heartActualIcon}/>
						<Text c={"white"} size="sm"fw={600}>
							100
						</Text>
					</Group>
					<Group gap={0} className={styles.bookmarkicon}>
						<Bookmark size={22} color="#3cc94d" className={styles.bookmarkActualIcon}/>
						<Text c={"white"} size="sm" fw={600}>
							17
						</Text>
					</Group>
				</Group>
			</TypographyStylesProvider>
		</Paper>
	);
}
