import { useState } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import './UploadReel.css';

const UploadReel = ({ userId }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleUpload = async () => {
    if (!videoUrl.trim()) {
      alert("Please enter a valid MP4 URL.");
      return;
    }
  
    if (!caption.trim()) {
      alert("Please add a caption before uploading.");
      return;
    }
  
    const validUserId = userId || new mongoose.Types.ObjectId(); // Generate a fallback valid ObjectId
  
    console.log('Sending payload to backend:', {
      videoUrl,
      caption,
      postedBy: validUserId,
    });
  

  
    try {
      const backendResponse = await axios.post('/api/reels', {
        videoUrl,
        caption,
        postedBy: validUserId,
      });
  
      console.log("Backend response:", backendResponse);
  
      setVideoUrl('');
      setCaption('');
      alert("Reel uploaded successfully!");
    } catch (error) {
      console.error("Error during upload:", error.response?.data);
      alert("Failed to upload. Please check console logs.");
    } 
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload Your Reel</h2>

        {/* MP4 URL Input */}
        <div className="url-input-section">
          <input
            type="url"
            placeholder="Paste your MP4 video URL here..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="url-input"
          />
        </div>

        {/* Caption Input */}
        <input
          type="text"
          placeholder="Write a cool caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />

        {/* Upload Button */}
        <button className='upload-button'
          onClick={handleUpload}
        >Upload
        </button>
      </div>
    </div>
  );
};

export default UploadReel;