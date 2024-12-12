import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";


import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import CookiesPolicy from "./pages/cookie/Cookie";
import ExplorePage from "./pages/explore/Explore";
import MessagePage from "./pages/messages/MessagePage";
import SearchPage from "./pages/Search/SearchPage";
import BookmarkPage from "./pages/Bookmark/BookmarkPage";
import CreatePostPage from "./pages/Create/CreatePostPage";
import Reels from "./pages/reels/Reels";
import UploadReel from './pages/reels/UploadReel';
import StoryBar from "./components/common/StoryBar";
import HelpdeskForm from "./pages/help/Help";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import SubscriptionPage from "./pages/subscription/subscription"
import { AdminPage } from "./Admin/dashboard/Dashboard";
import AdminSettings from "./Admin/settings/Settings"

import LoadingSpinner from "./components/common/LoadingSpinner";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import TermsOfUse from "./pages/terms/Terms";
import PaymentPage from "./pages/payment/PaymentPage";
import agiggle from "./agiggle.json";
import Lottie from "lottie-react";
import VIPAccessPage from "./pages/VIPAccess/VIPAccessForm";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle
	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};
	const { data: authUser, isLoading } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const token = localStorage.getItem('token');
				const res = await fetch("/api/auth/me",{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}` // Include token in Authorization header
						}
				});
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

	

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	if (!authUser && window.location.pathname !== "/login") {
		return <Navigate to="/login" />;
	}
	return (
		<div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
			<header className="w-full flex justify-between items-center">
				<div>
					<img src={isDarkMode ? "/logo.png" : "/logo-light.png"} className="h-10"/>
				</div>
				<div>
					{authUser && <h1 className="text-xl font-bold">Hello, {authUser.username}❤</h1>}
				</div>
				<button onClick={toggleTheme} className="bg-black-200 hover:bg-black-700 text-red font-bold py-1 px-2 rounded-sm">
				{isDarkMode ? "Light Mode" : "Dark Mode"}
				</button>
			</header>
			<div className="flex flex-grow">{authUser && <Sidebar />} <main className="flex-grow">
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
				<Route path='/login' element={!authUser ? <LoginPage animation={<Lottie animationData={agiggle} />} /> : <Navigate to='/' />} />
				<Route path='/google' element={!authUser?<LoginPage animation={<Lottie animationData={agiggle} />} /> : <Navigate to='/' />}/>
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route path='/explore' element={authUser ? <ExplorePage/> : <Navigate to='/' />}/>
				<Route path='/SearchPage' element={authUser ? <SearchPage/> :<Navigate to='/' />} />
				<Route path='/stories' element={authUser ? <StoryBar/> : <Navigate to='/' />} />
				<Route path='/reels' element={ authUser ? <Reels /> : <Navigate to='/' />} />
				<Route path='/upload-reel' element={authUser ? <UploadReel/> : <Navigate to ='/' />} />
				<Route path='/MessagePage' element={authUser ? <MessagePage/> :<Navigate to='/' />} />
				<Route path='/BookmarkPage' element={authUser ? <BookmarkPage/> :<Navigate to='/' />} />
				<Route path="/help" element={authUser ? <HelpdeskForm isDarkMode={isDarkMode} /> : <Navigate to="/" />} />
				<Route path='/CreatePostPage' element={authUser ? <CreatePostPage/> :<Navigate to='/' />} />
				<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/' />} />
				<Route path="/subscription" element={authUser ? (<SubscriptionPage isDarkMode={isDarkMode} />) : (<Navigate to="/login" />)}/>
				<Route path='/privacy-policy' element={<PrivacyPolicy />} />
				<Route path='/cookie-policy' element={<CookiesPolicy />} />
				<Route path='/terms-of-use' element={<TermsOfUse/>} />
				<Route path='/admin' element={authUser?.isAdmin? <AdminPage /> : <Navigate to='/' />} />
				<Route path='/settings' element={<AdminSettings />} />
				<Route path="/HomePage" element={authUser? <HomePage />:<Navigate to= '/'/>} />
				<Route path="/payment" element={authUser ? <PaymentPage isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />
				<Route path="/vipaccess" element={authUser ? <VIPAccessPage isDarkMode={isDarkMode} /> : <Navigate to="/login" />} />

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
			</main>
			{authUser && <RightPanel isDarkMode={isDarkMode}/>}
			</div>
			<Toaster />
		</div>
	);
}

 export default App;



