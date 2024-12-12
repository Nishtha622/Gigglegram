import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient instance
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

// Your Google OAuth Client ID
const googleClientId = '908013228419-p2e00bl9io38qvm6l5dmacftv73du8kq.apps.googleusercontent.com'; // Replace with your actual Google Client ID

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
		<GoogleOAuthProvider clientId={googleClientId}>
			<QueryClientProvider client={queryClient}>
					<App />
					</QueryClientProvider>
				</GoogleOAuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
