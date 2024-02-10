import { UserCardImage } from "./UserInfo/UserInfo";
import { Flex, Divider } from "@mantine/core";
import ContentButtons from "./ContentButtons/ContentButtons";
import { useState } from "react";
import Posts from "./Posts/Posts";
import Likes from "./Likes/Likes";

export type ProfileViewType = "posts" | "likes";

const Profile = () => {
	const [profileView, setProfileView] = useState<ProfileViewType>("posts");

	const handleProfileViewClick = (view: ProfileViewType) => {
		setProfileView(view);
	};

	const renderProfileView = () => {
		switch (profileView) {
			case "posts":
				return <Posts />;
			case "likes":
				return <Likes />;
		}
	};

	return (
		<div>
			<Flex h={"100%"} w={"100%"} direction="column">
				<UserCardImage />
				<ContentButtons handleProfileViewClick={handleProfileViewClick} />
				<Divider />
				{renderProfileView()}
			</Flex>
		</div>
	);
};

export default Profile;
