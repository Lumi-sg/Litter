import Cookies from "js-cookie";
import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TweetType } from "../Types/Tweet";
import { useUserStore } from "../Stores/userStore";



export const useGetUserLikes = (username: string) => {
    const { user } = useUserStore();
    const firebaseToken = Cookies.get("firebaseToken");
    console.log("Fetching likes...");
    return useQuery({
        queryKey: ["likes", user?.uid],
        queryFn: async () => {
            const { data } = await axios.get(
                `${baseURL}/user/${username}/likes`,
                {
                    headers: {
                        Authorization: `Bearer ${firebaseToken}`,
                    },
                }
            );
            return data.tweets as TweetType[];
        },
        staleTime: 3000,
    });
}