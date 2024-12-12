// export default HelpdeskForm;
import React, { useState } from "react";
import axios from "axios";

const HelpdeskForm = ({ isDarkMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !query) {
      setMessage("All fields are required.");
      return;
    }

    try {
      // Sending POST request to backend
      const response = await axios.post("/api/help/submit", {
        name,
        email,
        query,
      });

      // Display the success message
      setMessage(response.data.message);
      // Clear the form
      setName("");
      setEmail("");
      setQuery("");
    } catch (error) {
      setMessage("Error submitting query.");
      console.error("There was an error!", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: '1500px',
        maxHeight: "700px",
        height:"100%",
        margin: '0 auto',
        padding: '4rem',
        backgroundColor: isDarkMode ? '#333' : '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        transition: 'background-color 0.3s ease',
      }}
    >
      <h2
        style={{
          fontSize: '1.75rem',
          marginBottom: '1rem',
          textAlign: 'center',
          color: isDarkMode ? '#fff' : '#333',
        }}
      >
       
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2 rem',
        }}
      >
        <div>
          <label
            style={{
              fontSize: '1rem',
              color: isDarkMode ? '#fff' : '#333',
              marginBottom: '0.5rem',
            }}
          >
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease',
              outline: 'none',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#333',
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: '1rem',
              color: isDarkMode ? '#fff' : '#333',
              marginBottom: '0.5rem',
            }}
          >
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease',
              outline: 'none',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#333',
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: '1rem',
              color: isDarkMode ? '#fff' : '#333',
              marginBottom: '0.5rem',
            }}
          >
            Query:
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '100%',
              minHeight: '150px',
              resize: 'vertical',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease',
              outline: 'none',
              backgroundColor: isDarkMode ? '#444' : '#fff',
              color: isDarkMode ? '#fff' : '#333',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '1rem',
            backgroundColor: '#3182ce',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            width: '100%',
            backgroundColor: isDarkMode ? '#4a90e2' : '#3182ce',
          }}
        >
          Submit
        </button>
      </form>
      {message && (
        <p
          style={{
            fontSize: '1rem',
            color: message.includes('Error') ? '#e53e3e' : '#38a169',
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default HelpdeskForm;