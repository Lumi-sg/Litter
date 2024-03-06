import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import TweetInput from "../../../Features/TweetInput/TweetInput";
import { TweetVariant } from "../../../../constants/TweetVariant";
import useGetHomeFeed from "../../../../Hooks/useGetHomeFeed";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";

const Home = () => {
	const { data: homeFeedTweets, isLoading } = useGetHomeFeed();

	return (
		<>
			{isLoading ? <LoadingTweet /> : null}
			<TweetInput placeholderMessage="What's happening" isReply={false} />
			{homeFeedTweets?.map((tweet) => (
				<TweetComponent
					key={tweet._id}
					passedInStyles={TweetVariant.parent}
					tweet={tweet}
				/>
			))}
			{/*
			<TweetComponent passedInStyles={TweetVariant.parent} /> */}
		</>
	);
};

export default Home;
