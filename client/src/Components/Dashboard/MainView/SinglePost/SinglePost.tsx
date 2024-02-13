import { TweetComponent } from "../../../ModularComponents/TweetComponent/TweetComponent";
import TweetInput from "../Home/TweetInput/TweetInput";
import Comment from "./Comment/Comment";
const SinglePost = () => {
	return (
		<>
			<TweetComponent />
			<TweetInput placeholderMessage="Post your reply"/>
			<Comment />
			<Comment />
			<Comment />
		</>
	);
};

export default SinglePost;
