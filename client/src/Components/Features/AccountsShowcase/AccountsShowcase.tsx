import { SingleAccountComponent } from "./SingleAccountComponent/SingleAccountComponent";
import { Text } from "@mantine/core";
import { useGetTheeRandomUsers } from "../../../Hooks/useGetTheeRandomUsers";
import { useProfileGet } from "../../../Hooks/useProfileGet";
import LoadingTweet from "../LoadingTweet/LoadingTweet";
import { useUserStore } from "../../../Stores/userStore";
import { convertEmailToUsername } from "../../../Helpers/convertEmailToUsername";

const AccountsShowcase = () => {
	const { user } = useUserStore();
	const { data: users, isLoading } = useGetTheeRandomUsers();
	const { data: currentlyLoggedInUser } = useProfileGet(
		convertEmailToUsername(user?.email as string) as string
	);

	return (
		<>
			<Text c={"white"} size="lg" ta={"center"}>
				Who To Follow
			</Text>
			{isLoading ? (
				<LoadingTweet />
			) : (
				<>
					{users?.map((user) => (
						<SingleAccountComponent
							key={user._id}
							randomUser={user}
							currentlyLoggedInUser={currentlyLoggedInUser}
						/>
					))}
				</>
			)}
		</>
	);
};

export default AccountsShowcase;
