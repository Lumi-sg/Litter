import { create } from "zustand";
import { Socket } from "socket.io-client";

type socketStoreType = {
	socket: Socket | null;
	setSocket: (socket: Socket) => void;
};

export const useSocketStore = create<socketStoreType>((set) => ({
	socket: null,
	setSocket: (socket) => {
		set({ socket });
	},
}));
