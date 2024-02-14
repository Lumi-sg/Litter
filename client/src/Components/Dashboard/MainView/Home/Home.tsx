import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import TweetInput from "../../../Features/TweetInput/TweetInput";
import { TweetVariant } from "../../../../constants/TweetVariant";

const Home = () => {
	return (
		<>
			<TweetInput placeholderMessage="What's happening" isReply={false} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
		</>
	);
};

export default Home;
