import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";
import TweetInput from "../../../Features/TweetInput/TweetInput";
import { useEffect } from "react";
import { getTweet } from "../../../../Hooks/useGetTweet";
import { useParams } from "react-router-dom";
import { TweetType } from "../../../../Types/Tweet";
import TopOfSinglePost from "../../../Features/TopOfSinglePost/TopOfSinglePost";
const SinglePost = () => {
	const { tweetID } = useParams();
	const { data: tweet, isLoading } = getTweet(tweetID as string);
	useEffect(() => {
		const scrollFunction = () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		};

		// Using requestAnimationFrame to ensure the layout is fully updated
		requestAnimationFrame(scrollFunction);

		// Cleanup function
		return () => {
			// Cancel any pending animations to avoid issues during component unmount
			cancelAnimationFrame(scrollFunction as any);
		};
	}, []);
	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<TopOfSinglePost />
					<TweetComponent
						key={tweet?._id}
						passedInStyles={TweetVariant.parent}
						tweet={tweet as TweetType}
					/>
					<TweetInput
						placeholderMessage="Post your reply"
						isReply={true}
						parentTweet={tweet as TweetType}
					/>
					{tweet?.childrenCount! > 0 &&
						tweet?.children?.map((childTweet) => (
							<TweetComponent
								key={childTweet?._id}
								passedInStyles={TweetVariant.reply}
								tweet={childTweet as TweetType}
							/>
						))}
				</>
			)}
		</>
	);
};

export default SinglePost;
