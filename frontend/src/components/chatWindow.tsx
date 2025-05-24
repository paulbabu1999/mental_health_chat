import React from 'react';
import { Message } from '../types';

interface Props {
  messages: Message[];
}

const ChatWindow: React.FC<Props> = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
