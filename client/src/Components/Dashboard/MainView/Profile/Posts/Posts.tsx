import { TweetComponent } from "../../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../../constants/TweetVariant";
import { useGetUserTweets } from "../../../../../Hooks/useGetUserTweets";

import { useParams } from "react-router-dom";

const Posts = () => {
	const { username } = useParams();

	const { data, isLoading } = useGetUserTweets(username as string);
	return (
		<>
			{isLoading
				? null
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
