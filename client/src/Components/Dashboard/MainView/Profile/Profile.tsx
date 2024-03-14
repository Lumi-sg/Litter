import { UserCardImage } from "./UserInfo/UserInfo";
import { Flex } from "@mantine/core";
import ContentButtons from "./ContentButtons/ContentButtons";
import { useState } from "react";
import Posts from "./Posts/Posts";
import Likes from "./Likes/Likes";
import { useParams } from "react-router-dom";
import { useProfileGet } from "../../../../Hooks/User Hooks/useProfileGet";
import { useUserStore } from "../../../../Stores/userStore";
import { convertEmailToUsername } from "../../../../Helpers/convertEmailToUsername";

export type ProfileViewType = "posts" | "likes";

const Profile = () => {
	const { username } = useParams();
	const { user } = useUserStore();
	const [profileView, setProfileView] = useState<ProfileViewType>("posts");

	const { data: profileUserData, isLoading } = useProfileGet(
		username as string
	);
	const { data: currentUserData } = useProfileGet(
		convertEmailToUsername(user?.email as string) as string
	);

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

	return isLoading ? null : (
		<div>
			<Flex h={"100%"} w={"100%"} direction="column">
				<UserCardImage
					profileUserData={profileUserData}
					currentUserData={currentUserData}
					isLoading={isLoading}
				/>
				<ContentButtons
					handleProfileViewClick={handleProfileViewClick}
				/>
				{renderProfileView()}
			</Flex>
		</div>
	);
};

export default Profile;
