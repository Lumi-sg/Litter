import { TweetComponent } from "../TweetComponent/TweetComponent";
import TweetInput from "../TweetInput/TweetInput";
import { TweetVariant } from "../../../constants/TweetVariant";
import { TweetType } from "../../../Types/Tweet";
import { BrowserRouter } from "react-router-dom";
import { Browser } from "tabler-icons-react";

type TweetReplyModalProps = {
	tweet: TweetType;
};

const TweetReplyModal = ({ tweet }: TweetReplyModalProps & {}) => {
	return (
		<>
			<BrowserRouter>
				<TweetComponent
					passedInStyles={TweetVariant.parent}
					tweet={tweet}
				/>
				<TweetInput
					placeholderMessage="Post your reply"
					isReply={true}
					parentTweet={tweet}
				/>
			</BrowserRouter>
		</>
	);
};

export default TweetReplyModal;
