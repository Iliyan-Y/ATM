import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolClientId: import.meta.env.VITE_CLIENT_ID,
			userPoolId: import.meta.env.VITE_USER_POOL_ID,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
