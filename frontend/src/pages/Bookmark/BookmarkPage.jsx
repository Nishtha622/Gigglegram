import React, { useEffect, useState } from 'react';
import './BookmarkPage.css'; // Import the CSS file

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bookmarked posts on component mount
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch('/api/users/bookmarks',{
          method: 'GET',
          cache: 'no-cache'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        setBookmarks(data.bookmarks);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (id) => {
    try {
      const response = await fetch(`/api/posts/bookmark/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove bookmark');
      }

      // Optimistically update the state
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
    } catch (err) {
      console.error(err);
      setError('Unable to remove bookmark');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="bookmark-page">
      <h2>Your Bookmarked Posts</h2>
      <ul className="bookmark-list">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <li key={bookmark._id} className="bookmark-item">
              <div className="bookmark-header">{bookmark.user.firstName} @{bookmark.user.username}</div>
              <div className="bookmark-content">{bookmark.text}</div>
              <div className="bookmark-footer">
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveBookmark(bookmark._id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="no-bookmarks">No bookmarks found 🤔</li>
        )}
      </ul>
    </div>
  );
};

export default BookmarkPage;
