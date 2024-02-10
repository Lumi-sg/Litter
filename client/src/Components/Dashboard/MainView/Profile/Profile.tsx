import { UserCardImage } from "./UserInfo/UserInfo";
import { Flex, Center } from "@mantine/core";
import ContentButtons from "./ContentButtons/ContentButtons";

const Profile = () => {
	return (
		<div>
			<Flex h={"100%"} w={"100%"} direction="column">
				<UserCardImage />
					<ContentButtons />
			</Flex>
		</div>
	);
};

export default Profile;
