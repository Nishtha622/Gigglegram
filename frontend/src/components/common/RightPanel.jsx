import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import useFollow from "../../hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = ({ isDarkMode }) => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isPending } = useFollow();

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to handle dialog visibility

  if (suggestedUsers?.length === 0) return <div className='md:w-64 w-0'></div>;

  return (
    <div className='hidden lg:block my-4 mx-2'>
      <div
        className={`p-4 rounded-md sticky top-2 ${
          isDarkMode ? "bg-[#16181C]" : "bg-white"
        }`}
      >
        <p className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
          Who to follow
        </p>
        <div className='flex flex-col gap-4'>
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            suggestedUsers?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className={`flex items-center justify-between gap-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                key={user._id}>
                <div className='flex gap-2 items-center'>
                  <div className='avatar'>
                    <div className='w-8 rounded-full'>
                      <img
                        src={user.profileImg || "/avatar-placeholder.png"}
                        alt={user.firstName}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <span
                      className={`font-semibold tracking-tight truncate w-28 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {user.firstName}
                    </span>
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className={`btn ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-white hover:opacity-90"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    } rounded-full btn-sm`}
                    onClick={(e) => {
                      e.preventDefault();
                      follow(user._id);
                    }}
                  >
                    {isPending ? <LoadingSpinner size='sm' /> : "Follow"}
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <button className='fixed bottom-4 right-4 bg-blue-100 text-white p-3 rounded-full shadow-lg border-2 hover:bg-blue-400' onClick={() => setIsDialogOpen(true)}>
        <img src='../../public/chatbot.png' alt='Button Icon' className='w-12 h-12'/>
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-2xl rounded-lg p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsDialogOpen(false)}
            >
              ✖
            </button>
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/20/15/20241120152711-7EBXPBRP.json"
              width="100%"
              height="400px"
              frameBorder="0"
              allow="clipboard-write; microphone; camera"
              title="Chatbot"
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default RightPanel;
