import React from 'react';
import './Chatbox.css';

function Chatbox() {
    
  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Chatbox</h2>
      </div>
      <div className="chatbox-messages">
        <div className="chatbox-message">
          <p>User: Hello!</p>
        </div>
        <div className="chatbox-message">
          <p>Bot: Hi there!</p>
        </div>
        {/* Add more messages here */}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="chatbox-input"
      />
    </div>
  );
}

export default Chatbox;
