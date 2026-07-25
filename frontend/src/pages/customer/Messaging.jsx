import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../config/axios';
import { io } from 'socket.io-client';
import './Messaging.css';
import { FiSend } from 'react-icons/fi';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

export const Messaging = ({ recipientId, bookingId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      socket.emit('join', user.id);
      fetchMessages();

      socket.on('receive-message', (message) => {
        setMessages(prev => [...prev, message]);
      });
    }

    return () => socket.off('receive-message');
  }, [user]);

  const fetchMessages = async () => {
    try {
      const response = await apiClient.get(`/api/messages/conversation/${recipientId}`);
      setMessages(response.data.messages || []);
    } catch (err) {
      console.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socket.emit('send-message', {
      senderId: user.id,
      recipientId,
      content: newMessage,
      bookingId
    });

    setNewMessage('');
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="messaging-container">
      <div className="messages-list">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender === user.id ? 'sent' : 'received'}`}>
            <div className="message-content">{msg.content}</div>
            <div className="message-time">
              {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="message-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="btn btn-primary btn-small">
          <FiSend /> Send
        </button>
      </form>
    </div>
  );
};
