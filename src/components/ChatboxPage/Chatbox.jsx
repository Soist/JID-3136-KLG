import React, { useState } from 'react';
import './Chatbox.css';

function Chatbox() {
  const [messages, setMessages] = useState([

    { user: true, text: 'Hello!' },
    { user: false, text: 'Hi there! Ready to practice!' },

  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([
        ...messages,
        { user: true, text: inputMessage },
      ]);
      setInputMessage('');


      setTimeout(() => {
        setMessages([
          ...messages,
          { user: false, text: 'This is a simulated bot response.' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Chatbox</h2>
      </div>
      <div className="chatbox-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbox-message ${message.user ? 'user' : 'bot'}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbox-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          className="chatbox-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
