import { Stack, Group, Avatar, Text, Divider } from "@mantine/core";
import { Menu } from "tabler-icons-react";
import { useUserStore } from "../../../Stores/userStore";

const ConversationHeader = () => {
	const { user } = useUserStore();
	return (
		<>
			<Group justify="space-between">
				<Group>
					<Avatar src={user?.photoURL} size={40} radius="xl" />
					<Text c={"white"} size="md" fw={700}>
						{user?.displayName}
					</Text>
				</Group>
				<Menu size={20} color="white" />
			</Group>
			<Divider />
		</>
	);
};

export default ConversationHeader;
