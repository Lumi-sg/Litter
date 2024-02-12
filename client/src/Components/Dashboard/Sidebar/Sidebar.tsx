import { Button, Stack, Flex, Space, Text, Divider } from "@mantine/core";
import {
	Home,
	Bell,
	Mail,
	Bookmarks as BookmarksIcon,
	User as UserIcon,
	Trash,
} from "tabler-icons-react";
import { UserButton } from "./UserButton/Userbutton";
import { useComponentStore } from "../../../Stores/componentStore";

const Sidebar = () => {
	const { setSelectedComponent } = useComponentStore();
	return (
		<Flex
			w={"100%"}
			h={"100%"}
			direction="column"
			justify="space-between"
			align={"flex-end"}
			style={{ height: "100%" }}
			mr={10}
		>
			<Stack h={"100%"} justify="space-between">
				<Flex direction="column" align="flex-start">
					<Button
						onClick={() => setSelectedComponent("Home")}
						variant="subtle"
						color="violet"
						size="xl"
						radius="xl"
					>
						<Trash />
						<Space w="md" />
						<Text td={"underline"} size="xl" fw={"bold"}>
							Litter
						</Text>
					</Button>
				</Flex>
				<Divider style={{ width: "100%" }} />

				<Flex direction="column" align="flex-start" gap="lg">
					<Button
						onClick={() => setSelectedComponent("Home")}
						variant="subtle"
						color="violet"
						size="xl"
						radius="xl"
					>
						<Home />
						<Space w="md" />
						Home
					</Button>
					<Button
						onClick={() => setSelectedComponent("Notifications")}
						variant="subtle"
						color="violet"
						size="xl"
						radius="xl"
					>
						<Bell />
						<Space w="md" />
						Notifications
					</Button>
					<Button
						onClick={() => setSelectedComponent("Messages")}
						variant="subtle"
						color="violet"
						size="xl"
						radius="xl"
					>
						<Mail />
						<Space w="md" />
						Messages
					</Button>
					<Button
						onClick={() => setSelectedComponent("Bookmarks")}
						variant="subtle"
						color="violet"
						size="xl"
						radius="xl"
					>
						<BookmarksIcon />
						<Space w="md" />
						Bookmarks
					</Button>
					<Button
						onClick={() => setSelectedComponent("Profile")}
						variant="subtle"
						color="violet"
						size="xl"
						radius="xl"
					>
						<UserIcon />
						<Space w="md" />
						Profile
					</Button>
				</Flex>
				<Divider style={{ width: "100%" }} />

				<Flex direction="column" align="flex-start">
					<Button
						variant="outline"
						color="violet"
						size="lg"
						radius="xl"
						fullWidth
						mb="md"
					>
						Post
					</Button>
					<Space></Space>
					<UserButton />
				</Flex>
			</Stack>
		</Flex>
	);
};

export default Sidebar;
