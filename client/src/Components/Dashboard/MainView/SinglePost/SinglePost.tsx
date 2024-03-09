import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";
import TweetInput from "../../../Features/TweetInput/TweetInput";
import { useEffect } from "react";
import { getTweet } from "../../../../Hooks/useGetTweet";
import { useParams } from "react-router-dom";
import { TweetType } from "../../../../Types/Tweet";
import TopOfSinglePost from "../../../Features/TopOfSinglePost/TopOfSinglePost";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";
import { Divider, Space } from "@mantine/core";
const SinglePost = () => {
	const { tweetID } = useParams();
	const { data: tweet, isLoading } = getTweet(tweetID as string);
	const { data: parentTweet, isLoading: parentTweetIsLoading } = getTweet(
		tweet?.parent?.toString() as string
	);

	const doesTweetHaveParent = tweet?.parent !== null;

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
			{isLoading  && parentTweetIsLoading ? (
				<LoadingTweet />
			) : (
				<>
					<TopOfSinglePost />
					{doesTweetHaveParent && (
						<>
							<TweetComponent
								key={parentTweet?._id}
								passedInStyles={TweetVariant.parent}
								tweet={parentTweet as TweetType}
							/>
							<Space h={10} />
						</>
					)}
					<TweetComponent
						key={tweet?._id}
						passedInStyles={
							doesTweetHaveParent
								? TweetVariant.reply
								: TweetVariant.parent
						}
						tweet={tweet as TweetType}
					/>
					<Space h={10} />
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
