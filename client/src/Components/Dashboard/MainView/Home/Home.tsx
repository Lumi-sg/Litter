import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import TweetInput from "../../../Features/TweetInput/TweetInput";
import { TweetVariant } from "../../../../constants/TweetVariant";
import { useParentTweetStoreAuthor } from "../../../../Stores/parentTweetStoreAuthor";
import { useEffect } from "react";

const Home = () => {
	const { setParentTweetAuthor } = useParentTweetStoreAuthor();

	useEffect(() => {
		setParentTweetAuthor(null);
	}, []);
	return (
		<>
			<TweetInput placeholderMessage="What's happening" isReply={false} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
		</>
	);
};

export default Home;
