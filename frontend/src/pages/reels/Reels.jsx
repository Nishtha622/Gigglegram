import { useState, useEffect } from 'react';
import axios from 'axios';
import './Reels.css';
import UploadReel from './UploadReel';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const response = await axios.get('/api/reels');
      setReels(response.data.data);
    } catch (err) {
      setError("Failed to fetch reels. Please try again later.");
      console.error("Error fetching reels:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = (id) => {
    const videoElement = document.getElementById(`reel-${id}`);
    if (playing === id) {
      videoElement.pause();
      setPlaying(null);
    } else {
      if (playing) {
        const currentVideo = document.getElementById(`reel-${playing}`);
        currentVideo.pause();
      }
      videoElement.play();
      setPlaying(id);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.post(`/api/reels/${id}/like`);
      setReels((prevReels) =>
        prevReels.map((reel) =>
          reel._id === id ? { ...reel, likes: reel.likes + 1 } : reel
        )
      );
    } catch (err) {
      console.error("Error liking reel:", err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading reels...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="reels-container">
      <UploadReel></UploadReel>
{reels.length > 0 ? (
        reels.map((reel) => (
          <div key={reel._id} className="reel">
            <video
              id={`reel-${reel._id}`}
              src={reel.videoUrl}
              playsInline
              //muted
              loop
              className="reel-video"
              onClick={() => handlePlayPause(reel._id)}
            />
            <div className="reel-info">
              <p className="reel-caption">{reel.caption}</p>
              <div className="reel-actions">
                <button className="like-btn" onClick={() => handleLike(reel._id)}>
                  ❤ {reel.likes}
                </button>
                <button className="comment-btn">💬 Comment</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-reels">No reels found.</div>
      )}
    </div>
  );      
};

export default Reels;
