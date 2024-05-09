import { AppShell, Flex } from "@mantine/core";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import { useComponentStore } from "../../Stores/componentStore";
import Home from "./MainView/Home/Home";
import Notifications from "./MainView/Notifications/Notifications";
import Messages from "./MainView/Messages/Messages";
import Bookmarks from "./MainView/Bookmarks/Bookmarks";
import Profile from "./MainView/Profile/Profile";
import SinglePost from "./MainView/SinglePost/SinglePost";
import Infopanel from "./Infopanel/Infopanel";
import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorPage } from "../Features/ErrorPage/ErrorPage";
import { useUserStore } from "../../Stores/userStore";
import { useEffect } from "react";

export function Dashboard() {
	const { selectedComponent } = useComponentStore();
	const { setIsLoading } = useUserStore();

	useEffect(() => {
		setIsLoading(false);
	}, []);

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
			<AppShell.Main>
				<Routes>
					<Route path="/" element={<Navigate to="home" />} />
					<Route path="home" element={<Home />} />
					<Route path="notifications" element={<Notifications />} />
					<Route path="messages/*" element={<Messages />} />
					<Route path="bookmarks" element={<Bookmarks />} />
					<Route
						path="profile/:username"
						element={<Profile />}
						errorElement={<ErrorPage />}
					/>
					<Route path="tweet/:tweetID" element={<SinglePost />} />
					<Route path="*" element={<Navigate to="home" />} />
				</Routes>
			</AppShell.Main>
			{selectedComponent === "Messages" ? null : (
				<AppShell.Aside p="md">
					<Infopanel />
				</AppShell.Aside>
			)}

			<AppShell.Footer>
				<Flex align={"center"} justify={"center"} mt="xs">
					<Footer />
				</Flex>
			</AppShell.Footer>
		</AppShell>
	);
}
