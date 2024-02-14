import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";
import TweetInput from "../../../Features/TweetInput/TweetInput";
import { useEffect } from "react";
const SinglePost = () => {
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
			<TweetComponent passedInStyles={TweetVariant.parent} />
			<TweetInput placeholderMessage="Post your reply" parentAuthor="@johndoe"/>
			<TweetComponent passedInStyles={TweetVariant.reply} />
			<TweetComponent passedInStyles={TweetVariant.reply} />
			<TweetComponent passedInStyles={TweetVariant.reply} />
		</>
	);
};

export default SinglePost;
