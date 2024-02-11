import {
	Text,
	Avatar,
	Group,
	TypographyStylesProvider,
	Paper,
} from "@mantine/core";
import classes from "./TweetComponent.module.css";
import { useUserStore } from "../../../../../Stores/userStore";
import { convertEmailToUsername } from "../../../../../Helpers/convertEmailToUsername";
import { MessageCircle2, Heart, Bookmark } from "tabler-icons-react";

export function TweetComponent() {
	const { user } = useUserStore();

	return (
		<Paper withBorder radius="md" className={classes.comment}>
			<Group>
				<Avatar
					src={user?.photoURL}
					alt={user?.displayName as string}
					radius="xl"
				/>
				<div>
					<Group gap={5}>
						<Text fz="md" fw={700} c={"white"}>
							{user?.displayName as string}
						</Text>
						<Text fz="xs" c="violet">
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
				<Group justify="flex-start" gap={"30%"} mt={10}>
					<Group gap={2}>
						<MessageCircle2
							style={{
								cursor: "pointer",
								color: "#9775fa",
							}}
						/>
						<Text>53</Text>
					</Group>
					<Group gap={2}>
						<Heart
							style={{
								cursor: "pointer",
								color: "#d279cb",
							}}
						/>
						<Text>100</Text>
					</Group>
					<Group gap={2}>
						<Bookmark
							style={{
								cursor: "pointer",
								color: "#4097bf",
							}}
						/>
						<Text>17</Text>
					</Group>
				</Group>
			</TypographyStylesProvider>
		</Paper>
	);
}
