import { AppShell, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

export function Dashboard() {
	const [opened] = useDisclosure();

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
				<Main />
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
