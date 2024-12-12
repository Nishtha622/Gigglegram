import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoSearch } from 'react-icons/io5'; 
import { IoVideocam } from 'react-icons/io5'; 
import { IoEarth } from 'react-icons/io5'; 
import { IoChatbubbles } from 'react-icons/io5'; 
import { IoBookmark } from 'react-icons/io5';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaUser, FaUserTie } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { IoHelpCircle } from 'react-icons/io5';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdSubscriptions, MdStar } from 'react-icons/md';

const Sidebar = () => {
	const queryClient = useQueryClient();
	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/auth/logout", {
					method: "POST",
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
					<Link
						to='/SearchPage' // Update the path to '/search'
						className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
					>
						<IoSearch className='w-6 h-6' /> {/* Use the search icon here */}
						<span className='text-lg hidden md:block'>Search</span> {/* Update the text to 'Search' */}
					</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/explore'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoEarth className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Explore</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/CreatePostPage'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoAddCircleOutline className='w-6 h-6' /> {/* Create icon */}
							<span className='text-lg hidden md:block'>Create</span> {/* Text for Create */}
						</Link>
					</li>
					{/* Reels */}
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/reels'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoVideocam className='w-6 h-6' /> {/* Reels icon */}
							<span className='text-lg hidden md:block'>Reels</span> {/* Text for Reels */}
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to='/BookmarkPage'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'>
							<IoBookmark className='w-6 h-6' /> {/* Bookmark icon */}
							<span className='text-lg hidden md:block'>Bookmarks</span> {/* Text for Bookmarks */}
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to='/MessagePage'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoChatbubbles className='w-6 h-6' /> {/* Messages icon */}
							<span className='text-lg hidden md:block'>Messages</span> {/* Text for Messages */}
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/subscription'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							
							<MdSubscriptions className="w-8 h-8" />
							<span className='text-lg hidden md:block'>Subscription</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/vipaccess'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							
							<MdStar className="w-8 h-8" />
							<span className='text-lg hidden md:block'>VIPAccess</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/help'
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
						<IoHelpCircle className='w-6 h-6' /> {/* Use IoHelpCircle for the help icon */}
							<span className='text-lg hidden md:block'>Help</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${authUser?.username}`}
							className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
					{authUser?.isAdmin && (
						<li className='flex justify-center md:justify-start'>
							<Link
								to="/admin"
								className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
							>
								<FaUserTie className='w-6 h-6' />
								<span className='text-lg hidden md:block'>Admin Panel</span>
							</Link>
						</li>
					)}
					{authUser?.isAdmin && (
						<li className='flex justify-center md:justify-start'>
							<Link
								to="/settings"
								className='flex gap-3 items-center hover:bg-blue-200 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
							>
								<FaCog className='w-6 h-6' />
								<span className='text-lg hidden md:block'>Settings</span>
							</Link>
						</li>
					)}
				</ul>
				{authUser && (
					<Link
						to={`/profile/${authUser.username}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-blue-200 py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={authUser?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-grey font-bold text-sm w-20 truncate'>{authUser?.firstName}</p>
								<p className='text-slate-500 text-sm'>@{authUser?.username}</p>
							</div>
							<BiLogOut
								className='w-5 h-5 cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									logout();
								}}
							/>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;
