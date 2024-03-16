import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";
import TweetInput from "../../../Features/TweetInput/TweetInput";
import { useEffect } from "react";
import { getTweet } from "../../../../Hooks/Tweet Hooks/useGetTweet";
import { useParams } from "react-router-dom";
import TopOfSinglePost from "../../../Features/TopOfSinglePost/TopOfSinglePost";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";
import { Space } from "@mantine/core";
import { ErrorPage } from "../../../Features/ErrorPage/ErrorPage";

const SinglePost = () => {
	const { tweetID } = useParams();
	const { data: tweet, isLoading, error } = getTweet(tweetID as string);
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

	if (isLoading || parentTweetIsLoading) {
		return <LoadingTweet />;
	}
	if (error) {
		return <ErrorPage errorMessage={error.message} />;
	}

	return (
		<>
			<TopOfSinglePost />
			{doesTweetHaveParent && parentTweet && (
				<>
					<TweetComponent
						key={parentTweet._id}
						passedInStyles={TweetVariant.parent}
						tweet={parentTweet}
					/>
					<Space h={10} />
				</>
			)}
			{tweet && (
				<>
					<TweetComponent
						key={tweet._id}
						passedInStyles={
							doesTweetHaveParent
								? TweetVariant.reply
								: TweetVariant.parent
						}
						tweet={tweet}
					/>
					<Space h={10} />
					<TweetInput
						placeholderMessage="Post your reply"
						isReply={true}
						parentTweet={tweet}
					/>
					{tweet.childrenCount! > 0 &&
						tweet.children?.map((childTweet) => (
							<TweetComponent
								key={childTweet._id}
								passedInStyles={TweetVariant.reply}
								tweet={childTweet}
							/>
						))}
				</>
			)}
		</>
	);
};

export default SinglePost;
