import { UnstyledButton, Group, Avatar, Text, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";

export function UserButton() {
	return (
		<UnstyledButton className={classes.user}>
			<Group>
				<Avatar
					src="https://avatars.githubusercontent.com/u/12517973?v=4"
					radius="xl"
				/>

				<div style={{ flex: 1 }}>
					<Text size="md" fw={500}>
						Lumi Dumi
					</Text>

					<Text c="dimmed" size="sm">
						@Lumi_s
					</Text>
				</div>

				<IconChevronRight
					style={{ width: rem(14), height: rem(14) }}
					stroke={1.5}
				/>
			</Group>
		</UnstyledButton>
	);
}
