import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const theme = createTheme({
	breakpoints: {
		xs: "36em",
		sm: "48em",
		md: "62em",
		lg: "75em",
		xl: "88em",
		xxl: "121em",
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<MantineProvider theme={theme} forceColorScheme="dark">
		<App />
	</MantineProvider>
);
// Your web app's Firebase configuration

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

const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };
