import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './CreatePostPage.css'; // Import the CSS file

const CreatePostPage = () => {
  const [postContent, setPostContent] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = () => {
    if (postContent.trim() !== '' || imageSrc) {
      // Replace with actual submit logic, e.g., API call
      console.log('Post submitted:', { content: postContent, image: imageSrc });
      setPostContent(''); // Clear the textarea after submission
      setImageSrc(''); // Clear the captured image
    }
  };

  const toggleCamera = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  const captureImage = (webcamRef) => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      setImageSrc(capturedImage); // Save the captured image
      setIsCameraOpen(false); // Close the camera after capturing
    }
  };

  const webcamRef = React.useRef(null);

  return (
    <div className="create-post-page">
      <h2>Create a New Post</h2>
      <div className="create-post-form">
        <textarea
          value={postContent}
          onChange={handlePostChange}
          placeholder="What's on your mind?"
        />
        <button onClick={toggleCamera}>
          {isCameraOpen ? 'Close Camera' : 'Open Camera'}
        </button>
        {isCameraOpen && (
          <div className="webcam-container">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={false}
            />
            <button onClick={() => captureImage(webcamRef)}>Capture</button>
          </div>
        )}
        {imageSrc && (
          <div className="preview">
            <h4>Captured Image:</h4>
            <img src={imageSrc} alt="Captured" />
          </div>
        )}
        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default CreatePostPage;