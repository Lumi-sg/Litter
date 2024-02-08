import { Button, Stack, Flex, Space, Text, Divider } from "@mantine/core";
import {
	Home,
	Bell,
	Mail,
	Bookmarks,
	User as UserIcon,
	Trash,
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
					<Trash />
					<Space w="md" />
					<Text td={"underline"} size="xl" fw={"bold"}>
						Litter
					</Text>
				</Button>
			</Stack>
			<Divider />

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
			<Divider />
			<Stack>
				<Button variant="outline" color="violet" size="lg" radius="xl">
					Post
				</Button>
				<Space></Space>
				<UserButton />
			</Stack>
		</Flex>
	);
};

export default Sidebar;
