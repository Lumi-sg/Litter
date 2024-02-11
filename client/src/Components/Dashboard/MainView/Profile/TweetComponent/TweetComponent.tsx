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
						<Text fz="md" fw={700}>
							{user?.displayName as string}
						</Text>
						<Text fz="xs" c="dimmed">
							{convertEmailToUsername(user?.email as string)}
						</Text>
					</Group>

					<Text fz="xs" c="dimmed">
						10 minutes ago
					</Text>
				</div>
			</Group>
			<TypographyStylesProvider className={classes.body}>
				<Text>
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
								transition: "color 0.3s",
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.color = "#9775fa";
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.color = "";
							}}
						/>
						<Text c="dimmed">53</Text>
					</Group>
					<Group gap={2}>
						<Heart
							style={{
								cursor: "pointer",
								transition: "color 0.2s",
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.color = "#d279cb";
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.color = "";
							}}
						/>
						<Text c="dimmed">100</Text>
					</Group>
					<Group gap={2}>
						<Bookmark
							style={{
								cursor: "pointer",
								transition: "color 0.3s",
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.color = "#4097bf";
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.color = "";
							}}
						/>
					</Group>
				</Group>
			</TypographyStylesProvider>
		</Paper>
	);
}
