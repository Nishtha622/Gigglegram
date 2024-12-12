import { useState,useEffect,useRef } from "react";
import { Link, useNavigate} from "react-router-dom";
import './login.css'

import Footer from "../../../components/common/Footer";
 import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import {FaUserTie} from "react-icons/fa"
import { GoogleLogin } from '@react-oauth/google';
import { MdPassword } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = ({animation}) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		isAdmin: false,
	});
	const [displayedText, setDisplayedText] = useState("");
	const [currentNameIndex, setCurrentNameIndex] = useState(0);
	const typingRef = useRef(null); 
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	
	const names = ["Alice","Emily","James","David","Maria","Hanna","Grace","Simon","Tyler","Kevin"]; 
	const typingSpeed = 100; // Speed in milliseconds
	const erasingSpeed = 50; // Speed for erasing text
	const delayBeforeNextText = 1500; // Delay before switching to the next text

	const typeEffect = (text, index = 0) => {
		if (index < text.length) {
			setDisplayedText((prev) => prev + text[index]);
			setTimeout(() => typeEffect(text, index + 1), typingSpeed);
		} else {
			setTimeout(() => eraseEffect(text), delayBeforeNextText);
		}
	};

	const eraseEffect = (text, index = text.length) => {
		if (index > 0) {
			setDisplayedText((prev) => prev.slice(0, -1));
			setTimeout(() => eraseEffect(text, index - 1), erasingSpeed);
		} else {
			setTimeout(() => {
				setCurrentNameIndex((prev) => (prev + 1) % names.length);
			}, delayBeforeNextText);
		}
	};

	useEffect(() => {
		if (typingRef.current) {
			clearTimeout(typingRef.current);
		}
		typeEffect(names[currentNameIndex]);

		// Clean up function to clear timeout if the component unmounts
		return () => {
			if (typingRef.current) {
				clearTimeout(typingRef.current);
			}
		};
	}, [currentNameIndex]);


	const {mutate: loginMutation,isPending,isError,error,} = useMutation({
		mutationFn: async ({ username, password, isAdmin}) => {
			try {
				const res = await fetch("/api/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password, isAdmin: Boolean(isAdmin) }),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: (data) => {
			console.log("Login response data:", data);
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});


	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation(formData);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
	setFormData({ 
	...formData, 
	[name]: name === "isAdmin" ? value === "true" : value 
	});
	};

	
	const handleGoogleLogin = async (response) => {
		try {
			const { credential } = response;
			const res = await fetch('/api/auth/google', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id_token: credential }),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			}

			// Handle successful login
			localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
			navigate('/HomePage');
		} catch (error) {
			console.error('Error during Google login:', error);
		}
		};

		const handleGoogleLoginFailure = (error) => {
		console.error('Google login failed:', error);
		};
	return (
		<div>
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
		{/* <XSvg className='absolute top-4 left-4 w-36 h-36' /> */}
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				{animation}
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<div>
                    <h6 className="text-3xl font-extrabold text-center">
                        Giggle in {displayedText}'s gram
                    </h6>
                    <br></br>
                </div>
                <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <label className='input input-bordered rounded flex items-center gap-2 bg-gray-100 text-black border-zinc-800'>
                        <MdOutlineMail />
                        <input
                            type='text'
                            className='grow'
                            placeholder='username'
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>
					<label className='input input-bordered rounded flex items-center gap-2 flex-1 bg-grey text-white border-zinc-800'>
					<FaUserTie />
					<select
						className='grow'
						name='isAdmin'
						onChange={(e) => setFormData({ ...formData, isAdmin: e.target.value === "true" })}
						value={formData.isAdmin.toString()}>
						<option value='false'>No</option>
						<option value='true'>Yes</option>
					</select>
					</label>
					<label className='input input-bordered rounded flex items-center gap-2 bg-gray-100 text-black border-zinc-800'>
                        <MdPassword />
                        <input
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>
                        {isPending ? "Loading..." : "Login"}
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-grey text-lg'>{"Don't"} have an account?</p>
                    <Link to='/signup'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </Link>
				</div>
				or <br></br>
				<div className='flex flex-col gap-2 mt-4 '>
					<p className='text-grey text-lg'>You can login using Google</p>
					</div>
				<div className='mt-4'>

				<GoogleLogin
				onSuccess={handleGoogleLogin}
				onFailure={handleGoogleLoginFailure}
				/>

		</div>
		<div className='flex flex-col gap-2 mt-4'>
					<p className='text-grey text-lg'>
						By signing up you agree to our Terms of service and Privacy Policy, including cookie use
					</p>
					</div>
			</div>
			</div>
			<Footer/>

		</div>
	);
};
export default LoginPage;
