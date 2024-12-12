import { useState } from "react";
import Posts from "../../components/common/Posts";
import StoryBar from '../../components/common/StoryBar';
import CreatePost from "./CreatePost";

const HomePage = ({ isDarkMode }) => {
	const [feedType, setFeedType] = useState("forYou");

	const currentUserId = 1;

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
				{/* Header */}
				<div className='flex flex-col w-full border-b border-gray-700'>
					<StoryBar currentUserId={currentUserId} />
					
					{/* Feed Type Navigation */}
					<div className='flex w-full border-b border-gray-700'>
						<div
							className={`flex justify-center flex-1 p-3 hover:bg-${
								isDarkMode ? "gray-600" : "gray-200"
							} transition duration-300 cursor-pointer relative`}
							onClick={() => setFeedType("forYou")}
						>
							{/* For You Button */}
							<span
								className={`${
									isDarkMode ? "text-white" : "text-black"
								} font-bold`}
							>
								For you
							</span>
							{feedType === "forYou" && (
								<div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary'></div>
							)}
						</div>
					</div>
				</div>

				{/* Create Post Input */}
				<CreatePost />

				{/* Posts */}
				<Posts feedType={feedType} />
			</div>
		</>
	);
};
export default HomePage;
