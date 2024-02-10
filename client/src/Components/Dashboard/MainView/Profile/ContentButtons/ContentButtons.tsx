import { Group, Button, Divider } from "@mantine/core";
import { ProfileViewType } from "../Profile";

type ContentButtonPros = {
	handleProfileViewClick: (view: ProfileViewType) => void;
};

const ContentButtons = ({ handleProfileViewClick }: ContentButtonPros) => {
	return (
		<Group
			gap={0}
			mt={10}
			mb={10}
			w={"100%"}
			justify="center"
			align="center"
		>
			<Button
				w={"49%"}
				radius="md"
				size="md"
				variant="subtle"
				color="violet"
				onClick={() => handleProfileViewClick("posts")}
			>
				Posts
			</Button>
			<Divider orientation="vertical" />
			<Button
				w={"49%"}
				radius="md"
				size="md"
				variant="subtle"
				color="violet"
				onClick={() => handleProfileViewClick("likes")}
			>
				Likes
			</Button>
		</Group>
	);
};

export default ContentButtons;
