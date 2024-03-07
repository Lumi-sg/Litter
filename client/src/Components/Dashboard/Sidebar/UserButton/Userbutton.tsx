import { UnstyledButton, Group, Avatar, Text, rem, Menu } from "@mantine/core";
import { IconChevronUp } from "@tabler/icons-react";
import { Logout } from "tabler-icons-react";
import classes from "./UserButton.module.css";
// import { useMantineColorScheme } from "@mantine/core";
import { useUserStore } from "../../../../Stores/userStore";
import { useNavigate } from "react-router-dom";
import { convertEmailToUsername } from "../../../../Helpers/convertEmailToUsername";

export function UserButton() {
	const { user } = useUserStore();
	const navigate = useNavigate();

	const trimDisplayName = (displayName: string) => {
		if (!displayName) {
			console.log("No display name provided");
			return;
		}

		return displayName.split(" ")[0];
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
		<Menu position="top-end" withArrow>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group>
						<Avatar src={user?.photoURL} radius="xl" />

						<div style={{ flex: 1 }}>
							<Text size="md" fw={700} c={"white"}>
								{trimDisplayName(user?.displayName as string)}
							</Text>

							<Text c="dimmed" size="xs">
								{convertEmailToUsername(
									user?.email?.toString() as string
								)}
							</Text>
						</div>

						<IconChevronUp
							style={{ width: rem(14), height: rem(14) }}
							stroke={1.5}
						/>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown bg={"#242424"}>
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
