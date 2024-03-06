import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";
import { useGetUserBookmarks } from "../../../../Hooks/useGetUserBookmarks";
import { useUserStore } from "../../../../Stores/userStore";
import { convertEmailToUsername } from "../../../../Helpers/convertEmailToUsername";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";
import { Alert, Center, Space, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const Bookmarks = () => {
	const { user } = useUserStore();
	const { data, isLoading } = useGetUserBookmarks(
		convertEmailToUsername(user!.email as string)
	);

	const userHasBookmarks = data && data.length > 0;
	return (
		<>
			{isLoading ? (
				<LoadingTweet />
			) : userHasBookmarks ? (
				<>
					<Text c={"white"} fz={"xl"} fw={700} mb={-5}>
						Bookmarks
					</Text>
					<Text
						c={"dimmed"}
						fz={"sm"}
						fw={500}
						component={Link}
						to={`/dashboard/profile/${convertEmailToUsername(
							user!.email as string
						)}`}
					>
						{convertEmailToUsername(user!.email as string)}
					</Text>
					<Space h={"md"} />
					{data.map((tweet) => (
						<TweetComponent
							passedInStyles={TweetVariant.parent}
							tweet={tweet}
							key={tweet._id}
						/>
					))}
				</>
			) : (
				<Center mt={50}>
					<Alert
						variant="outline"
						color="violet"
						radius="md"
						title=""
						w="50%"
						fz={"5rem"}
						ta={"center"}
						p={"xl"}
					>
						{
							<>
								<h3>You have no bookmarks.</h3>
								<br />
								<h4>
									Bookmark posts to easily find them again in
									the future.
								</h4>
							</>
						}
					</Alert>
				</Center>
			)}
		</>
	);
};

export default Bookmarks;
