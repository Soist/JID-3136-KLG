//Chatbox.jsx
import React, { useState } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator,MessageTimestamp } from '@chatscope/chat-ui-kit-react'
const OPENAI_API_KEY = "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";


function Chatbox() {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);


  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello, Welcome to Korean Practice Chatbot",
      sender: "ChatGPT",
      timestamp: Date.now(),
      sentTime: "just now",
    },
  ]);

  
  
  const handleUserMessage = async (userMessage) => {
  
    const newUserMessage = {
      message: userMessage,
      sender: "user",
      direction: "outgoing",
      timestamp: Date.now(),
      sentTime: "just now",
    };
 
    const updatedChatMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedChatMessages);
 
      
    setIsChatbotTyping(true);
 
   
    await processUserMessageToChatGPT(updatedChatMessages);
  };
 
  
  async function processUserMessageToChatGPT(messages) {

    let apiMessages = messages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
 
  
    const systemMessage = {
      role: "system",
      content: "Practice Basic Conversational Skills in Korean ",
    };
 
    
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, 
        ...apiMessages,
      ],
    };
 
    
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const timestamp = new Date().toLocaleString();
        
        setChatMessages([
          ...messages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            sentTime: timestamp,

          },
        ]);
   
        setIsChatbotTyping(false);
      });

      console.log("API Request Body:", apiRequestBody);
      
  }

  
 
  return (
    <>
      <div style={{ height: "85vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h4 style={{className: "chatbox-title", backgroundColor: "pink", width: "35vh", textAlign: "center"}}>Korean Practice Chatbot</h4>
        <MainContainer style={{ width: "100%", maxWidth: "900px", flexGrow: 1 }}>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isChatbotTyping ? (
                  <TypingIndicator content="ChatGPT is thinking" />
                ) : null
              }
            >
              {chatMessages.map((message, i) => (
                <Message
                  key={i}
                  model={message}
                  style={message.sender === "ChatGPT" ? { textAlign: "left" } : {}}
                >
                  <Message.Footer sender={message.sender} sentTime={message.sentTime} />
                  <div className="message-timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                  
                </Message>
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type your Message here"
              onSend={handleUserMessage}
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
        <div style={{ width: "100vh", backgroundColor: "pink", textAlign: "center", marginTop: "1vh"}}>This chatbot is powered by OpenAI's ChatGPT. Please never type personal or confidential information into this chatbot. Please refer to <a href="https://openai.com/policies/privacy-policy">OpenAI's privacy policy</a> to read more about how they process user data.</div>
      </div>
    </>
  );
}

export default Chatbox;


