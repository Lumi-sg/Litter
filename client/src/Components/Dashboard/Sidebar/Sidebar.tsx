import {
	Button,
	Stack,
	Flex,
	Space,
	Text,
	Divider,
	Container,
} from "@mantine/core";
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
		<Flex h={"100%"}>
			<Container w={"45%"} h={"100%"}></Container>
			<Container w={"45%"} h={"100%"}>
				<Flex
					w={"100%"}
					h={"100%"}
					direction="column"
					justify="space-between"
					style={{ height: "100%" }}
				>
					<Stack align="flex-start">
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
					</Stack>
					<Divider />

					<Stack align="flex-start">
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
							onClick={() =>
								setSelectedComponent("Notifications")
							}
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
					</Stack>
					<Divider />
					<Stack>
						<Button
							variant="outline"
							color="violet"
							size="lg"
							radius="xl"
						>
							Post
						</Button>
						<Space></Space>
						<UserButton />
					</Stack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default Sidebar;
