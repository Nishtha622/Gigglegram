import React, { useState } from "react";
import { useNavigate} from "react-router-dom"
import "./SearchPage.css"; // Import the CSS file

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    if (!searchTerm.trim()) {
      setResults([]); // Clear results if search term is empty
      return;
    }

    setIsLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await fetch(
        `/api/users/search?query=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setResults(data); // Update results with the fetched data
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchUsers();
  };
  const goToProfile = (username) => {
    navigate(`/profile/${username}`); // Navigate to the profile page
  };

  return (
    <div className="search-page">
      <h2>Search Users</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && results.length === 0 && searchTerm && (
        <p>No users found for "{searchTerm}"</p>
      )}

      <ul className="result-list">
        {results.map((user) => (
          <li key={user._id} className="result-item">
            <img src={user.profileImg || "https://via.placeholder.com/75"} alt={user.username} />
            <h3 onClick={() => goToProfile(user.username)} className="clickable">
              {user.username}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
