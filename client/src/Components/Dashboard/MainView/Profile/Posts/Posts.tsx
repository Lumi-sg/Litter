import { TweetComponent } from "../../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../../constants/TweetVariant";

const Posts = () => {
	return (
		<>
			<TweetComponent passedInStyles={TweetVariant.post} />
			<TweetComponent passedInStyles={TweetVariant.post} />
			<TweetComponent passedInStyles={TweetVariant.post} />
			<TweetComponent passedInStyles={TweetVariant.post} />
		</>
	);
};

export default Posts;
