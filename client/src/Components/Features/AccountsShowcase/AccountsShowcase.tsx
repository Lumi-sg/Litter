import { SingleAccountComponent } from "./SingleAccountComponent/SingleAccountComponent";
import { Text } from "@mantine/core";
import { useGetTheeRandomUsers } from "../../../Hooks/useGetTheeRandomUsers";
import LoadingTweet from "../LoadingTweet/LoadingTweet";

const AccountsShowcase = () => {
	const { data: users, isLoading } = useGetTheeRandomUsers();
	return (
		<>
			<Text c={"white"} size="lg" ta={"center"}>
				Who To Follow
			</Text>
			{isLoading ? <LoadingTweet /> : <>
				{users?.map((user) => (
					<SingleAccountComponent key={user._id} randomUser={user} />
				))}
			</>}
		</>
	);
};

export default AccountsShowcase;
