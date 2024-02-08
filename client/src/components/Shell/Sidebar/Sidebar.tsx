import { Button, Stack, Flex, Space } from "@mantine/core";
import {
	Home,
	Bell,
	Mail,
	Bookmarks,
	User as UserIcon,
} from "tabler-icons-react";
import { UserButton } from "./Usercard/Usercard";

const Sidebar = () => {
	return (
		<Flex
			direction="column"
			justify="space-between"
			style={{ height: "100%" }}
		>
			<Stack align="flex-start">
				<Button variant="subtle" color="violet" size="xl" radius="xl">
					<Home />
					<Space w="md" />
					Home
				</Button>
				<Button variant="subtle" color="violet" size="xl" radius="xl">
					<Bell />
					<Space w="md" />
					Notifications
				</Button>
				<Button variant="subtle" color="violet" size="xl" radius="xl">
					<Mail />
					<Space w="md" />
					Messages
				</Button>
				<Button variant="subtle" color="violet" size="xl" radius="xl">
					<Bookmarks />
					<Space w="md" />
					Bookmarks
				</Button>
				<Button variant="subtle" color="violet" size="xl" radius="xl">
					<UserIcon />
					<Space w="md" />
					Profile
				</Button>
			</Stack>
			<UserButton />
		</Flex>
	);
};

export default Sidebar;
