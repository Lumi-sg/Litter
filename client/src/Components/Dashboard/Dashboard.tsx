import { AppShell, Center } from "@mantine/core";
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
			footer={{ height: 60 }}
			navbar={{
				width: 600,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			aside={{
				width: 600,
				breakpoint: "md",
				collapsed: { desktop: false, mobile: true },
			}}
			padding="md"
		>
			<AppShell.Navbar p="md">
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>
				{renderSwitch()}
			</AppShell.Main>
			<AppShell.Aside p="md">Aside</AppShell.Aside>
			<AppShell.Footer p="md">
				<Center>
					<Footer />
				</Center>
			</AppShell.Footer>
		</AppShell>
	);
}
