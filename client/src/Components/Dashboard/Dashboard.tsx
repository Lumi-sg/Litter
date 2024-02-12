import { AppShell, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import { useComponentStore } from "../../Stores/componentStore";
import Home from "./MainView/Home/Home";
import Notifications from "./MainView/Notifications/Notifications";
import Messages from "./MainView/Messages/Messages";
import Bookmarks from "./MainView/Bookmarks/Bookmarks";
import Profile from "./MainView/Profile/Profile";
export function Dashboard() {
	const { selectedComponent } = useComponentStore();
	const [opened] = useDisclosure();

	const renderSwitch = () => {
		switch (selectedComponent) {
			case "Home":
				return <Home />;
			case "Notifications":
				return <Notifications />;
			case "Messages":
				return <Messages />;
			case "Bookmarks":
				return <Bookmarks />;
			case "Profile":
				return <Profile />;
			default:
				return <Home />;
		}
	};

	return (
		<AppShell
			footer={{ height: 40 }}
			navbar={{
				collapsed: { desktop: false, mobile: true },
				width: { xs: 325, lg: 325, xl: 600, xxl: 900 },
				breakpoint: "xs",
			}}
			aside={{
				collapsed: { desktop: false, mobile: true },
				width: { xs: 325, lg: 325, xl: 600, xxl: 900 },
				breakpoint: "xs",
			}}
			padding="md"
		>
			<AppShell.Navbar p="md">
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>{renderSwitch()}</AppShell.Main>
			<AppShell.Aside p="md">Aside</AppShell.Aside>
			<AppShell.Footer>
				<Flex align={"center"} justify={"center"} mt="xs">
					<Footer />
				</Flex>
			</AppShell.Footer>
		</AppShell>
	);
}
