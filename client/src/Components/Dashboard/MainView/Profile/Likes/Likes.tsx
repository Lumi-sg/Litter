import { TweetComponent } from "../../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../../constants/TweetVariant";
import { useGetUserLikes } from "../../../../../Hooks/useGetUserLikes";
import { useParams } from "react-router-dom";
import LoadingTweet from "../../../../Features/LoadingTweet/LoadingTweet";

const Likes = () => {
	const { username } = useParams();
	const { data, isLoading } = useGetUserLikes(username as string);

	return (
		<>
			{isLoading
				? <LoadingTweet />
				: data?.map((tweet) => (
						<TweetComponent
							passedInStyles={TweetVariant.like}
							key={tweet._id}
							tweet={tweet}
						/>
				  ))}
		</>
	);
};

export default Likes;
