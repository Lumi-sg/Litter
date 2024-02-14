import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User as FirebaseUser } from "firebase/auth";

type parentTweetStoreAuthorType = {
    parentTweetAuthor: FirebaseUser | null;
    setParentTweetAuthor: (parentTweetAuthor: FirebaseUser | null) => void;
};

export const useParentTweetStoreAuthor = create<parentTweetStoreAuthorType>()(
    devtools((set) => ({
        parentTweetAuthor: null,
        setParentTweetAuthor: (parentTweetAuthor) => set({ parentTweetAuthor }),
    }))
)