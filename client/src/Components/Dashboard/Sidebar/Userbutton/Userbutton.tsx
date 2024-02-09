import { UnstyledButton, Group, Avatar, Text, rem, Menu } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Logout, SunMoon } from "tabler-icons-react";
import classes from "./UserButton.module.css";
import { useMantineColorScheme } from "@mantine/core";
import { useUserStore } from "../../../../Stores/userStore";
import { useNavigate } from "react-router-dom";
import { convertEmailToUsername } from "../../../../Helpers/convertEmailToUsername";

export function UserButton() {
	const { user } = useUserStore();
	const navigate = useNavigate();
	const { toggleColorScheme } = useMantineColorScheme();

	const handleThemeToggle = () => {
		toggleColorScheme();
	};

	const handleLogoutClick = async () => {
		const logoutSuccess = await useUserStore.getState().logout();
		if (logoutSuccess) {
			navigate("/");
			return;
		}
		console.log("Logout failed");
	};

	return (
		<Menu position="right" withArrow>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group>
						<Avatar src={user?.photoURL} radius="xl" />

						<div style={{ flex: 1 }}>
							<Text size="md" fw={500}>
								{user?.displayName}
							</Text>

							<Text c="dimmed" size="xs">
								{convertEmailToUsername(
									user?.email?.toString() as string
								)}
							</Text>
						</div>

						<IconChevronRight
							style={{ width: rem(14), height: rem(14) }}
							stroke={1.5}
						/>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					onClick={handleThemeToggle}
					leftSection={
						<SunMoon style={{ width: rem(18), height: rem(18) }} />
					}
				>
					<Text>Toggle Theme</Text>
				</Menu.Item>
				<Menu.Item
					onClick={handleLogoutClick}
					color="red"
					leftSection={
						<Logout style={{ width: rem(18), height: rem(18) }} />
					}
				>
					<Text>Logout</Text>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
