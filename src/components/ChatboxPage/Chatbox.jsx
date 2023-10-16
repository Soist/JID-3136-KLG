import React, { useState } from 'react';
import './Chatbox.css';
import KoreanKeyboard from './KoreanKeyboard'; 

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showKoreanKeyboard, setShowKoreanKeyboard] = useState(false);

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
          { user: false, text: 'Bot: This is a simulated bot response.' },
        ]);
      }, 1000);
    }
  };

  const handleCharacterClick = (char) => {
    setInputMessage(inputMessage + char);
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Welcome to Korean Practice Chat</h2>
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
        <button className="korean-keyboard-button" onClick={() => setShowKoreanKeyboard(!showKoreanKeyboard)}>
          Korean Keyboard
        </button>
      </div>
      {showKoreanKeyboard && <KoreanKeyboard onCharacterClick={handleCharacterClick} />}
    </div>
  );
}

export default Chatbox;

