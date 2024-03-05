import { TweetComponent } from "../../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../../constants/TweetVariant";
import { useGetUserTweets } from "../../../../../Hooks/useGetUserTweets";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet";
import { useParams } from "react-router-dom";

const Posts = () => {
	const { username } = useParams();

	const { data, isLoading } = useGetUserTweets(username as string);
	return (
		<>
			{isLoading
				? <LoadingTweet />
				: data?.map((tweet) => (
						<TweetComponent
							passedInStyles={TweetVariant.post}
							key={tweet._id}
							tweet={tweet}
						/>
				  ))}
		</>
	);
};

export default Posts;
