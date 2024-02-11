import { useUserStore } from "../../../../../Stores/userStore";
import { Avatar, Group, Paper } from "@mantine/core";
const TweetInput = () => {
	const { user } = useUserStore();

	return (
		<div>
			<Paper withBorder radius="md" p={10}>
				<Group mb={10}>
					<Avatar src={user?.photoURL} size={40} radius="xl" />
				</Group>
			</Paper>
		</div>
	);
};

export default TweetInput;
