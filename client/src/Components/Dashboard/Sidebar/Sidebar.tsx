import {
	Button,
	Stack,
	Flex,
	Space,
	Text,
	Divider,
	Badge,
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
import { useParentTweetStoreAuthor } from "../../../Stores/parentTweetStoreAuthor";
import { modals } from "@mantine/modals";
import TweetComposeModal from "../../Features/TweetComposeModal/TweetComposeModal";
import { useUserStore } from "../../../Stores/userStore";
import { Link } from "react-router-dom";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";
import { useGetNotifications } from "../../../Hooks/useGetNotifications";
import { NotificationType } from "../../../Types/Notifications";

const Sidebar = () => {
	const { setSelectedComponent } = useComponentStore();

	const { setParentTweetAuthor } = useParentTweetStoreAuthor();

	const { user } = useUserStore();

	const { data: notifications, isLoading } = useGetNotifications(
		user?.uid as string
	);

	// const { mutate: markNotificationsRead } = useMarkNotificationsRead(
	// 	notifications as NotificationType[]
	// );

	const newNotifcations = notifications?.filter(
		(notification: NotificationType) => notification.read === false
	);

	const handlePostClick = () => {
		setParentTweetAuthor(null);
		modals.open({
			children: <TweetComposeModal />,
			size: 700,
			withCloseButton: false,
			radius: "md",
		});
	};

	const handleNotifcationsClick = () => {
		setSelectedComponent("Notifications");
	};

	return (
		<Flex
			w={"100%"}
			h={"100%"}
			miw={"100%"}
			direction="column"
			justify="space-between"
			align={"flex-end"}
			style={{ height: "100%" }}
			mr={10}
		>
			<Stack h={"100%"} justify="space-between">
				<Flex direction="column" align="flex-start">
					<Link to="/dashboard/home">
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
					</Link>
				</Flex>
				<Divider style={{ width: "100%" }} />

				<Flex direction="column" align="flex-start" gap="lg">
					<Link to="/dashboard/home">
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
					</Link>
					<Link to="/dashboard/notifications">
						<Button
							onClick={handleNotifcationsClick}
							variant="subtle"
							color="violet"
							size="xl"
							radius="xl"
							miw="100%"
						>
							<Bell />
							<Space w="md" />
							Notifications
							<Space w="md" />
							{isLoading ? (
								null
							) : newNotifcations &&
							  newNotifcations.length > 0 ? (
								<Badge
									color="violet"
									variant="outline"
									circle
									size="md"
									style={{
										position: "absolute",
										top: 5,
										right: 20,
									}}
								>
									{newNotifcations.length}
								</Badge>
							) : null}
						</Button>
					</Link>
					<Link to="/dashboard/messages">
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
					</Link>
					<Link to="/dashboard/bookmarks">
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
					</Link>
					<Link
						to={`/dashboard/profile/${convertEmailToUsername(
							user?.email as string
						)}`}
					>
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
					</Link>
				</Flex>
				<Divider style={{ width: "100%" }} />

				<Flex direction="column" align="flex-start">
					<Button
						onClick={handlePostClick}
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
