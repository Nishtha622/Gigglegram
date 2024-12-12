import React, { useState } from 'react';
import './settings.css';

const AdminSettings = () => {
  const [siteName, setSiteName] = useState('GiggleGram');
  const [allowSignup, setAllowSignup] = useState(true);
  const [theme, setTheme] = useState('light');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSave = () => {
    console.log('Saving settings...');
    console.log({
      siteName,
      allowSignup,
      theme,
      twoFactorAuth,
    });
    alert('Settings saved successfully!');
  };

  const containerStyle =
    theme === 'light'
      ? { backgroundColor: 'white', color: 'black' }
      : { backgroundColor: 'black', color: 'white' };

  const inputStyle =
    theme === 'light'
      ? { backgroundColor: 'white', color: 'black', border: '1px solid #ddd' }
      : { backgroundColor: 'black', color: 'white', border: '1px solid white' };

  const labelStyle =
    theme === 'light'
      ? { color: 'black' }
      : { color: 'white' };

  return (
    <div className="settings-container" style={containerStyle}>
      <h2 style={labelStyle}>Admin Settings</h2>
      <div className="settings-form">
        {/* Site Name */}
        <div className="form-group">
          <label style={labelStyle}>Site Name:</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="input-field"
            style={inputStyle}
          />
        </div>

        {/* Allow Signup Toggle */}
        <div className="form-group">
          <label style={labelStyle}>Allow User Signup:</label>
          <input
            type="checkbox"
            checked={allowSignup}
            onChange={() => setAllowSignup(!allowSignup)}
            className="checkbox"
            style={inputStyle}
          />
        </div>

        {/* Theme Selector */}
        <div className="form-group">
          <label style={labelStyle}>Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select"
            style={inputStyle}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Two Factor Authentication */}
        <div className="form-group">
          <label style={labelStyle}>Enable Two Factor Authentication:</label>
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
            className="checkbox"
            style={inputStyle}
          />
        </div>

        {/* Save Button */}
        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
