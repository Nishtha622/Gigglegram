// 
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import XSvg from "../../../components/svgs/X";
import './signup.css';
import Footer from "../../../components/common/Footer";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    isAdmin: false, // Add default state for isAdmin
  });

  const [displayedText, setDisplayedText] = useState("");
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const typingRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Handle navigation

  const names = ["Alice", "Emily", "James", "David", "Maria", "Hanna", "Grace", "Simon", "Tyler", "Kevin"];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBeforeNextText = 1500;

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

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [currentNameIndex]);

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, firstName, lastName, password, isAdmin }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, firstName, lastName, password, isAdmin}),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // Redirect the user after signup based on their isAdmin value
      if (data?.isAdmin) {
		console.log("Navigating to admin-dashboard...");
        navigate('/admin');
      } else {
        navigate('/HomePage');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
	const { name, value } = e.target;
	setFormData({ 
	...formData, 
	[name]: name === "isAdmin" ? value === "true" : value 
	});
  };
  

  return (
    <div>
      <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
        <div className='flex-1 hidden lg:flex items-center  justify-center'>
          <XSvg className='lg:w-2/3 fill-white' />
        </div>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <form
            className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col'
            onSubmit={handleSubmit}>
            <XSvg className='w-24 lg:hidden fill-white' />
            <h4 className="text-3xl font-extrabold text-center">Giggle in {displayedText}'s gram</h4>
            <label className='input input-bordered rounded flex items-center gap-2 bg-gray-100 text-black border-zinc-800'>
              <MdOutlineMail />
              <input
                type='email'
                className='grow'
                placeholder='Email'
                name='email'
                onChange={handleInputChange}
                value={formData.email}
              />
            </label>
			<label className='input input-bordered rounded flex items-center gap-2 bg-gray-100 text-black border-zinc-800'>
              <FaUser />
              <input
                type='text'
                className='grow'
                placeholder='Username'
                name='username'
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
            <label className='input input-bordered rounded flex items-center gap-2 bg-gray-100 text-black border-zinc-800'>
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
                <MdDriveFileRenameOutline />
                <input
                  type='text'
                  className='grow'
                  placeholder='First Name'
                  name='firstName'
                  onChange={handleInputChange}
                  value={formData.firstName}
                />
              </label>
			<label className='input input-bordered rounded flex items-center gap-2 bg-gray-100 text-black border-zinc-800'>
                <MdDriveFileRenameOutline />
                <input
                  type='text'
                  className='grow'
                  placeholder='Last Name'
                  name='lastName'
                  onChange={handleInputChange}
                  value={formData.lastName}
                />
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
              {isPending ? "Loading..." : "Sign up"}
            </button>
            {isError && <p className='text-red-500'>{error.message}</p>}
          </form>
          <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
            <p className='text-grey text-lg'>Already have an account?</p>
            <Link to='/login'>
              <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;