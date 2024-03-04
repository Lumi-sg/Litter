import { TweetComponent } from "../TweetComponent/TweetComponent";
import TweetInput from "../TweetInput/TweetInput";
import { TweetVariant } from "../../../constants/TweetVariant";
import { TweetType } from "../../../Types/Tweet";

type TweetReplyModalProps = {
	tweet: TweetType;
};

const TweetReplyModal = ({ tweet }: TweetReplyModalProps & {}) => {
	console.table(tweet);
	return (
		<>
			<TweetComponent
				passedInStyles={TweetVariant.parent}
				tweet={tweet}
			/>
			<TweetInput
				placeholderMessage="Post your reply"
				isReply={true}
				parentTweet={tweet}
			/>
		</>
	);
};

export default TweetReplyModal;
