// import { useState } from 'react';

// const StoryBar = ({ currentUserId }) => {
// 	const [isImagePickerOpen, setIsImagePickerOpen] = useState(false); // For image picker modal
// 	const [selectedStoryImage, setSelectedStoryImage] = useState(null); // Store selected story image
// 	const [storyPosted, setStoryPosted] = useState(false); // Track if a story is posted
// 	const [isStoryModalOpen, setIsStoryModalOpen] = useState(false); // Control story modal visibility

// 	// Default profile image
// 	const defaultProfileImage = '/story/img1.jpg';

// 	// Stories array with user details
// 	const stories = [
// 		{ id: 1, username: 'User1', imgSrc: defaultProfileImage }, // Default profile image
// 		{ id: 2, username: 'User2', imgSrc: '/story/img2.jpg' },
// 		{ id: 3, username: 'User3', imgSrc: '/story/img3.jpg' },
// 	];

// 	// Open the image picker modal
// 	const handleAddStory = () => {
// 		setIsImagePickerOpen(true);
// 	};

// 	// Post the selected story image and apply the colorful border
// 	const handlePostStory = () => {
// 		if (selectedStoryImage) {
// 			setStoryPosted(true);
// 			setIsImagePickerOpen(false);
// 		}
// 	};

// 	// Cancel story creation
// 	const handleCancelStory = () => {
// 		setIsImagePickerOpen(false);
// 		setSelectedStoryImage(null);
// 	};

// 	// Open the story modal when clicking on the user's story
// 	const handleViewStory = () => {
// 		if (storyPosted) {
// 			setIsStoryModalOpen(true);
// 		}
// 	};

// 	// Close the story modal
// 	const handleCloseStoryModal = () => {
// 		setIsStoryModalOpen(false);
// 	};

// 	return (
// 		<div className='flex overflow-x-auto p-3 border-b border-gray-700 bg-black-800'>
// 			{/* Stories */}
// 			{stories.map((story) => (
// 				<div key={story.id} className='flex flex-col items-center mr-4'>
// 					<div
// 						className="relative flex items-center justify-center cursor-pointer"
// 						onClick={story.id === currentUserId ? handleViewStory : undefined} // Open story modal only for the logged-in user
// 					>
// 						{/* Profile image */}
// 						<div
// 							className={`w-16 h-16 rounded-full overflow-hidden ${
// 								story.id === currentUserId && storyPosted
// 									? 'border-4 border-pink-600' // Highlight for logged-in user's story
// 									: 'bg-gray-300'
// 							}`}
// 						>
// 							<img
// 								src={story.imgSrc}
// 								alt={story.username}
// 								className='w-full h-full object-cover'
// 							/>
// 						</div>

// 						{/* "+" Button for the logged-in user */}
// 						{story.id === currentUserId && !storyPosted && (
// 							<button
// 								className="absolute top-[-10px] right-[-10px] bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
// 								onClick={handleAddStory}
// 							>
// 								+
// 							</button>
// 						)}
// 					</div>
// 					<span className='text-sm mt-2 text-gray-400'>{story.username}</span>
// 				</div>
// 			))}

// 			{/* Image Picker Modal */}
// 			{isImagePickerOpen && (
// 				<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20'>
// 					<div className='bg-white rounded-lg w-96 p-6'>
// 						<h2 className='text-lg font-bold mb-4'>Select or Upload an Image</h2>

// 						{/* File Upload */}
// 						<div className='flex flex-col items-center'>
// 							<input
// 								type="file"
// 								accept="image/*"
// 								className="mb-4"
// 								onChange={(e) => {
// 									const file = e.target.files[0];
// 									if (file) {
// 										const fileURL = URL.createObjectURL(file);
// 										setSelectedStoryImage(fileURL);
// 									}
// 								}}
// 							/>
// 						</div>

// 						{/* Preview */}
// 						<div className='w-full h-24 flex justify-center items-center mb-4'>
// 							{selectedStoryImage && (
// 								<img
// 									src={selectedStoryImage}
// 									alt="Preview"
// 									className='w-24 h-24 object-cover rounded-md'
// 								/>
// 							)}
// 						</div>

// 						{/* Action Buttons */}
// 						<div className='flex justify-between mt-4'>
// 							<button
// 								className='bg-gray-300 text-gray-800 py-2 px-4 rounded-md'
// 								onClick={handleCancelStory}
// 							>
// 								Cancel
// 							</button>
// 							<button
// 								className={`py-2 px-4 rounded-md ${
// 									selectedStoryImage
// 										? 'bg-blue-500 text-white'
// 										: 'bg-gray-300 text-gray-800 cursor-not-allowed'
// 								}`}
// 								onClick={handlePostStory}
// 								disabled={!selectedStoryImage}
// 							>
// 								Post Story
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}

// 			{/* Story Modal */}
// 			{isStoryModalOpen && selectedStoryImage && (
// 				<div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-30'>
// 					<div className='relative'>
// 						<img
// 							src={selectedStoryImage}
// 							alt="User's Story"
// 							className='w-full max-w-lg max-h-[80vh] object-contain rounded-lg'
// 						/>
// 						<button
// 							className='absolute top-2 right-2 bg-white text-black p-2 rounded-full font-bold'
// 							onClick={handleCloseStoryModal}
// 						>
// 							X
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default StoryBar;





import { useState, useEffect } from 'react';

const StoryBar = ({ currentUserId }) => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false); // For image picker modal
  const [selectedStoryImage, setSelectedStoryImage] = useState(null); // Store selected story image
  const [storyPosted, setStoryPosted] = useState(false); // Track if a story is posted
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false); // Control story modal visibility
  const [userStory, setUserStory] = useState(null); // To track the currently available user story

  const defaultProfileImage = '/story/img1.jpg';

  const stories = [
    { id: 1, username: 'User1', imgSrc: defaultProfileImage },
    { id: 2, username: 'User2', imgSrc: '/story/img2.jpg' },
    { id: 3, username: 'User3', imgSrc: '/story/img3.jpg' },
  ];

  // Fetch user's story from localStorage on page load
  useEffect(() => {
    const storedStory = JSON.parse(localStorage.getItem('userStory'));

    if (storedStory) {
      const currentTime = new Date().getTime();
      const storyTime = storedStory.timestamp;

      // Check if the story is still within the 24-hour window
      if (currentTime - storyTime < 24 * 60 * 60 * 1000) {
        setUserStory(storedStory.imgSrc);
        setStoryPosted(true);
      } else {
        // If expired, clear it
        localStorage.removeItem('userStory');
        setStoryPosted(false);
      }
    }
  }, []);

  // Open the image picker modal
  const handleAddStory = () => {
    setIsImagePickerOpen(true);
  };

  // Post story and save it to localStorage
  const handlePostStory = () => {
    if (selectedStoryImage) {
      const storyData = {
        imgSrc: selectedStoryImage,
        timestamp: new Date().getTime(), // Save current timestamp
      };

      localStorage.setItem('userStory', JSON.stringify(storyData));
      setUserStory(selectedStoryImage);
      setStoryPosted(true);
      setIsImagePickerOpen(false);
    }
  };

  const handleCancelStory = () => {
    setIsImagePickerOpen(false);
    setSelectedStoryImage(null);
  };

  const handleViewStory = () => {
    if (storyPosted) {
      setIsStoryModalOpen(true);
    }
  };

  const handleCloseStoryModal = () => {
    setIsStoryModalOpen(false);
  };

  return (
    <div className="flex overflow-x-auto p-3 border-b border-gray-700 bg-black-800">
      {/* Stories */}
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center mr-4">
          <div
            className="relative flex items-center justify-center cursor-pointer"
            onClick={story.id === currentUserId ? handleViewStory : undefined}
          >
            <div
              className={`w-16 h-16 rounded-full overflow-hidden ${
                story.id === currentUserId && storyPosted
                  ? 'border-4 border-pink-600'
                  : 'bg-gray-300'
              }`}
            >
              <img
                src={story.id === currentUserId ? userStory || defaultProfileImage : story.imgSrc}
                alt={story.username}
                className="w-full h-full object-cover"
              />
            </div>
            {story.id === currentUserId && !storyPosted && (
              <button
                className="absolute top-[-10px] right-[-10px] bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
                onClick={handleAddStory}
              >
                +
              </button>
            )}
          </div>
          <span className="text-sm mt-2 text-gray-400">{story.username}</span>
        </div>
      ))}

      {/* Image Picker Modal */}
      {isImagePickerOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Select or Upload an Image</h2>

            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                className="mb-4"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const fileURL = URL.createObjectURL(file);
                    setSelectedStoryImage(fileURL);
                  }
                }}
              />
            </div>

            <div className="w-full h-24 flex justify-center items-center mb-4">
              {selectedStoryImage && (
                <img
                  src={selectedStoryImage}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                onClick={handleCancelStory}
              >
                Cancel
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  selectedStoryImage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-800 cursor-not-allowed'
                }`}
                onClick={handlePostStory}
                disabled={!selectedStoryImage}
              >
                Post Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Modal */}
      {isStoryModalOpen && userStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-30">
          <div className="relative">
            <img
              src={userStory}
              alt="User's Story"
              className="w-full max-w-lg max-h-[80vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full font-bold"
              onClick={handleCloseStoryModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryBar;



