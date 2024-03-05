import { TweetComponent } from "../../../Features/TweetComponent/TweetComponent";
import { TweetVariant } from "../../../../constants/TweetVariant";
import { useGetUserBookmarks } from "../../../../Hooks/useGetUserBookmarks";
import { useUserStore } from "../../../../Stores/userStore";
import { convertEmailToUsername } from "../../../../Helpers/convertEmailToUsername";
import LoadingTweet from "../../../Features/LoadingTweet/LoadingTweet";

const Bookmarks = () => {
	const { user } = useUserStore();
	const { data, isLoading } = useGetUserBookmarks(
		convertEmailToUsername(user!.email as string)
	);
	return (
		<>
			{isLoading ? (
				<LoadingTweet />
			) : data ? (
				data.map((tweet) => (
					<TweetComponent
						passedInStyles={TweetVariant.parent}
						tweet={tweet}
						key={tweet._id}
					/>
				))
			) : (
				<div>No bookmarks found</div>
			)}
		</>
	);
};

export default Bookmarks;
