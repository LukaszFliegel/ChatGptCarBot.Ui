// src/components/Chat.tsx
import { Button, Input } from 'antd';
import React, { useState } from 'react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    // Send a POST request to the backend API with the 'prompt' parameter
    try {
      const response = await fetch('https://localhost:7011/Chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: newMessage }), // Include 'prompt' parameter
      });

      if (response.ok) {
        const data = await response.text();
        setMessages([...messages, newMessage, data]);
        setNewMessage('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        <div  className="chat-message">
            I am here to help you pick a car you want!
          </div>
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleInputChange}
          className='promptImput'
        />
        <Button type="primary" htmlType="submit">
            Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
