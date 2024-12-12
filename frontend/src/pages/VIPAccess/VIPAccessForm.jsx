import React, { useState } from "react";

function VIPAccessForm({ isDarkMode }) {
  const [formData, setFormData] = useState({
    username: "",
    userId: "",
    email: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.userId || !formData.email) {
      setStatus("All fields are required.");
      return;
    }

    setStatus("Sending request...");
    setIsLoading(true); // Show loading spinner

    try {
      const response = await fetch("http://localhost:5000/api/vipaccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Log the raw response for debugging
      const text = await response.text();
      console.log("Raw response:", text);

      // Manually parsing the response to handle errors
      const result = JSON.parse(text);
      if (response.ok) {
        setStatus("Request sent successfully!");
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? "#1a202c" : "#f8f9fa",
        color: isDarkMode ? "#ffffff" : "#343a40",
      }}
    >
      <h1 style={styles.title}>VIP Access Request</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
              borderColor: isDarkMode ? "#4a5568" : "#ced4da",
            }}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
              borderColor: isDarkMode ? "#4a5568" : "#ced4da",
            }}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
              borderColor: isDarkMode ? "#4a5568" : "#ced4da",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: isDarkMode ? "#2b6cb0" : "#007bff",
            color: isDarkMode ? "#ffffff" : "#ffffff",
          }}
        >
          Request VIP Access
        </button>
      </form>
      {status && (
        <p
          style={{
            ...styles.status,
            color: isDarkMode ? "#90cdf4" : "#28a745",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    transition: "background-color 0.3s, color 0.3s",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s, color 0.2s",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  status: {
    marginTop: "15px",
    fontSize: "1rem",
  },
};

export default VIPAccessForm;