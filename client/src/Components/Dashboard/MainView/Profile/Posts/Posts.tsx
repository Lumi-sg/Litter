import { TweetComponent } from "../../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../../constants/TweetVariant";
import { useGetUserTweets } from "../../../../../Hooks/useGetUserTweets";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet";
import { useParams } from "react-router-dom";
import { Alert, Center } from "@mantine/core";

const Posts = () => {
	const { username } = useParams();
	const { data, isLoading } = useGetUserTweets(username as string);

	const userHasPosts = data && data.length > 0;

	return (
		<>
			{isLoading ? (
				<LoadingTweet />
			) : userHasPosts ? (
				data.map((tweet) => (
					<TweetComponent
						passedInStyles={TweetVariant.post}
						key={tweet._id}
						tweet={tweet}
					/>
				))
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
						{`${username} has no tweets.`}
					</Alert>
				</Center>
			)}
		</>
	);
};

export default Posts;
