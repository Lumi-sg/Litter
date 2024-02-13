import { TweetComponent } from "../../../ModularComponents/TweetComponent/TweetComponent";
import TweetInput from "./TweetInput/TweetInput";
import { TweetVariant } from "../../../../constants/TweetVariant";

const Home = () => {
	return (
		<>
			<TweetInput placeholderMessage="What's happening" />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
		</>
	);
};

export default Home;
