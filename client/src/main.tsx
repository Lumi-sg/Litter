import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	browserSessionPersistence,
} from "firebase/auth";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { ModalsProvider } from "@mantine/modals";
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
// import { useUserStore } from "./Stores/userStore.ts";
// import { onAuthStateChanged } from "firebase/auth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { refreshUserToken } from "./Helpers/refreshUserToken.ts";

const theme = createTheme({
	breakpoints: {
		xs: "36em",
		sm: "48em",
		md: "62em",
		lg: "75em",
		xl: "88em",
		xxl: "121em",
	},
	cursorType: "pointer",
});
const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: async (error) => {
			if (error.message.includes("401")) {
				console.log("refreshing token...");
				await refreshUserToken();
			}
		},
	}),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<MantineProvider theme={theme} forceColorScheme="dark">
			<ModalsProvider>
				<Notifications
					position="bottom-right"
					zIndex={99999}
					color="violet"
					limit={5}
					autoClose={3000}
				/>

				<App />
				<ReactQueryDevtools
					initialIsOpen={false}
					client={queryClient}
				/>
			</ModalsProvider>
		</MantineProvider>
	</QueryClientProvider>
);
const firebaseConfig = {
	apiKey: "AIzaSyBt0MlhKtNInXeiV4Ltr1c0NRqqXUjKKvs",

	authDomain: "litter-2b00b.firebaseapp.com",

	projectId: "litter-2b00b",

	storageBucket: "litter-2b00b.appspot.com",

	messagingSenderId: "253751632859",

	appId: "1:253751632859:web:ae8a82f49b6f76abae7dfe",
};

// Initialize Firebase

const litterApp = initializeApp(firebaseConfig);
const auth = getAuth(litterApp);

await auth.setPersistence(browserSessionPersistence);

const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };
