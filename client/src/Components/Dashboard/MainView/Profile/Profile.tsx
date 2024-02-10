import { UserCardImage } from "./UserInfo/UserInfo";
import { Flex, Divider } from "@mantine/core";
import ContentButtons from "./ContentButtons/ContentButtons";

const Profile = () => {
	return (
		<div>
			<Flex h={"100%"} w={"100%"} direction="column">
				<UserCardImage />
				<ContentButtons />
				<Divider />
			</Flex>
		</div>
	);
};

export default Profile;
