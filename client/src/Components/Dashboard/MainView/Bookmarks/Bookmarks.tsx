import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";

const Bookmarks = () => {
	return (
		<>
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetComponent passedInStyles={TweetVariant.parent} />
		</>
	);
};

export default Bookmarks;
