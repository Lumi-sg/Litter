import { TweetComponent } from "../TweetComponent/TweetComponent";
import TweetInput from "../TweetInput/TweetInput";
import { TweetVariant } from "../../../constants/TweetVariant";



const TweetModal = () => {
	return (
		<>
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetInput placeholderMessage="Post your reply" isReply={true} />
		</>
	);
};

export default TweetModal;
