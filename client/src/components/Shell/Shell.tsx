import { AppShell, Burger, Center, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

export function FullLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			footer={{ height: 60 }}
			navbar={{
				width: 250,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			aside={{
				width: 300,
				breakpoint: "md",
				collapsed: { desktop: false, mobile: true },
			}}
			padding="md"
		>
			<AppShell.Navbar p="md">
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>
				Aside is hidden on on md breakpoint and cannot be opened when it
				is collapsed
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
