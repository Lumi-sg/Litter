import { TweetComponent } from "../../../ModularComponents/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";
import TweetInput from "../Home/TweetInput/TweetInput";
import { useEffect } from "react";
const SinglePost = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<>
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetInput placeholderMessage="Post your reply" />
			<TweetComponent passedInStyles={TweetVariant.reply} />
			<TweetComponent passedInStyles={TweetVariant.reply} />
			<TweetComponent passedInStyles={TweetVariant.reply} />
		</>
	);
};

export default SinglePost;
