// ChatAssistant.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: 'user', content: input };
  setMessages([...messages, userMessage]);
  
  console.log("Sending message:", input); // DEBUG
  
  const messageToSend = input;
  setInput('');
  setLoading(true);

  try {
    const idToken = localStorage.getItem('idToken');
    
    console.log("Request payload:", { message: messageToSend, type: 'schedule' }); // DEBUG
    
    const response = await axios.post(
      'https://young-innovator-backend.vercel.app/chat',
      {
        message: messageToSend,
        type: 'schedule'
      },
      {
        headers: { Authorization: idToken }
      }
    );

    const aiMessage = { role: 'assistant', content: response.data.message };
    setMessages([...messages, userMessage, aiMessage]);
  } catch (error) {
    console.error('Error:', error);
    console.error('Error response:', error.response?.data); // DEBUG
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col h-96 border rounded-lg p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${
              msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-xs`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-500">جاري الكتابة...</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border rounded px-3 py-2"
          placeholder="اسأل عن الجدول..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          إرسال
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
