import { Card, Text, Group, Button, Center } from "@mantine/core";
import classes from "./UserCardImage.module.css";

import { UserInfoIcons } from "./UserInfoIcon";

const stats = [
	{ value: "34K", label: "Followers" },
	{ value: "187", label: "Follows" },
	{ value: "1.6K", label: "Posts" },
];

export function UserCardImage() {
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

	return (
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
				<UserInfoIcons />
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
				>
					Follow
				</Button>
				<Button
					w={"25%"}
					radius="md"
					mt="xl"
					size="md"
					variant="outline"
					color="violet"
				>
					Message
				</Button>
			</Group>
		</Card>
	);
}
