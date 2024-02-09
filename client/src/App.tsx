import { Dashboard } from "./Components/Dashboard/Dashboard";
import Login from "./Components/Onboard/Login";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <Login />,
	},

	{
		path: "/dashboard",
		element: <Dashboard />,
	},
]);

function App() {
	return (
		<RouterProvider router={router} future={{ v7_startTransition: true }} />
	);
}

export default App;
