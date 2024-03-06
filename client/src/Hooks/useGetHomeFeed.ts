import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TweetType from "../Types/Tweet";
import { useUserStore } from "../Stores/userStore";

export const useGetHomeFeed = () => {
    const {user} = useUserStore();
	const firebaseToken = Cookies.get("firebaseToken");

	return useQuery({
		queryKey: ["homefeed", user?.uid],
		queryFn: async () => {
			const { data } = await axios.get(`${baseURL}/user/homefeed`, {
				headers: {
					Authorization: `Bearer ${firebaseToken}`,
				},
			});
			return data.allTweets as TweetType[];
		},
	});
};

export default useGetHomeFeed;