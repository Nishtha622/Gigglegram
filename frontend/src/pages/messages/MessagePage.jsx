import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessagePage.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch messages based on query params
  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/messages`, {
        params: {
          sender: sender || undefined,
          receiver: receiver || undefined,
          page,
          limit: 10, // Adjust as needed
        },
      });
      setMessages(response.data.messages);
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page, sender, receiver]);

  // Send new message
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/messages', {
        sender,
        receiver,
        content,
      });
      setContent('');
      fetchMessages(); // Refresh messages after sending
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div className="message-container">
      <h2 className="message-title">Messages</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="send-message-section">
      <h3 className="form-title">Send New Message</h3>
      <form onSubmit={sendMessage} className="message-form">
        <div className="form-group">
          <label htmlFor="sender" className="label">Sender ID:</label>
          <input
          type="text"
          id="sender"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          required
          className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="receiver" className="label">Receiver ID:</label>
          <input
          type="text"
          id="receiver"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          required
          className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="label">Message:</label>
          <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength="500"
          required
          className="textarea-field"
          />
        </div>
        <button type="submit" className="send-btn" disabled={content.trim() === ""}>
         Send Message
        </button>
      </form>
    </div>



      <div>
        <h3>Messages</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message._id}>
                <strong>{message.sender}</strong> to <strong>{message.receiver}</strong>: {message.content}
                <p>{new Date(message.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Messages;
