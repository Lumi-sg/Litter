import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MainViewComponentsType } from "../Types/MainComponents";

type ComponentStoreType = {
	selectedComponent: MainViewComponentsType;
	setSelectedComponent: (component: MainViewComponentsType) => void;
};

export const useComponentStore = create<ComponentStoreType>()(
	devtools((set) => ({
		selectedComponent: "Home",
		setSelectedComponent: (component) => {
			set({ selectedComponent: component });
		},
	}))
);
