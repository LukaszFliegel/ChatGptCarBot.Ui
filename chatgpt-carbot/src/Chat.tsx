import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';

function generateRandomGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userGuid, setUserGuid] = useState<string>('');

  useEffect(() => {
    // Generate a random guid when the component mounts (new user)
    const guid = generateRandomGuid();
    setUserGuid(guid);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    // Send a POST request to the backend API with the 'guid' field
    try {
      const response = await fetch('https://localhost:7011/Chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Prompt: newMessage, guid: userGuid }), // Include 'guid' field
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
        <div className="chat-message">
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
        />
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
