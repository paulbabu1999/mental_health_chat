import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/userForm';
import ChatWindow from './components/chatWindow';
import InputBox from './components/inputBox';
import { Message, UserInfo } from './types';
import './styles.css';

const App: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleUserSubmit = async (userInfo: UserInfo) => {
    setUser(userInfo);
    await axios.post('http://localhost:5050/api/start-chat', userInfo);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);

    const response = await axios.post('http://localhost:5050/api/send-message', {
      userId: user?.phone,
      message: text
    });

    const botReply: Message = { sender: 'bot', text: response.data.reply };
    setMessages(prev => [...prev, botReply]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      console.log('Fetching messages');
        const response = await axios.get(`http://localhost:5050/api/chats`);
        console.log(response.data);
    };

    fetchMessages();
  }, []);
  return (
    <div className="app">
      {!user ? (
        <UserForm onSubmit={handleUserSubmit} />
      ) : (
        <>
          <ChatWindow messages={messages} />
          <InputBox onSend={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default App;
