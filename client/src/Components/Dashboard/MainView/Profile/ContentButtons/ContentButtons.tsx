import { Group, Button, Divider } from "@mantine/core";
import { ProfileViewType } from "../Profile";
import React, { useState } from "react";

type ContentButtonPros = {
	handleProfileViewClick: (view: ProfileViewType) => void;
};

const ContentButtons = ({ handleProfileViewClick }: ContentButtonPros) => {
	const [isPostsSelected, setIsPostsSelected] = useState(true);
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
				variant={isPostsSelected === true ? "outline" : "subtle"}
				color="violet"
				onClick={() => {
					handleProfileViewClick("posts");
					setIsPostsSelected(true);
				}}
			>
				Posts
			</Button>
			<Divider orientation="vertical" />
			<Button
				w={"49%"}
				radius="md"
				size="md"
				variant={isPostsSelected === true ? "subtle" : "outline"}
				color="violet"
				onClick={() => {
					handleProfileViewClick("likes");
					setIsPostsSelected(false);
				}}
			>
				Likes
			</Button>
		</Group>
	);
};

export default ContentButtons;
