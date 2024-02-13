import { TweetComponent } from "../../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../../constants/TweetVariant";

const Likes = () => {
	return (
		<>
			<TweetComponent passedInStyles={TweetVariant.like} />
			<TweetComponent passedInStyles={TweetVariant.like} />
			<TweetComponent passedInStyles={TweetVariant.like} />
			<TweetComponent passedInStyles={TweetVariant.like} />
			<TweetComponent passedInStyles={TweetVariant.like} />
		</>
	);
};

export default Likes;
