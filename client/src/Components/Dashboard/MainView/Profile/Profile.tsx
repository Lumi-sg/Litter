import { UserCardImage } from "./UserInfo/UserInfo";
import { Flex } from "@mantine/core";
import ContentButtons from "./ContentButtons/ContentButtons";
import { useState } from "react";
import Posts from "./Posts/Posts";
import Likes from "./Likes/Likes";
import { useParams } from "react-router-dom";
import { useProfileGet } from "../../../../Hooks/useProfileGet";
import { useGetUserTweets } from "../../../../Hooks/useGetUserTweets";

export type ProfileViewType = "posts" | "likes";

const Profile = () => {
	const { username } = useParams();
	const [profileView, setProfileView] = useState<ProfileViewType>("posts");

	const { data, isLoading } = useProfileGet(username as string);

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
				<UserCardImage userData={data} isLoading={isLoading} />
				<ContentButtons
					handleProfileViewClick={handleProfileViewClick}
				/>
				{renderProfileView()}
			</Flex>
		</div>
	);
};

export default Profile;
