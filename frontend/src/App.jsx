import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, X, Maximize2, Minimize2, Send, Bot } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am the BLINC AI Assistant. Ask me anything about our internship program or company profile.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to the BLINC network.' }]);
    }
    setIsLoading(false);
  };

  // --- STATE 1: FLOATING LAUNCHER ICON ---
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all z-50 flex items-center justify-center"
      >
        <MessageSquare size={32} />
      </button>
    );
  }

  // --- STATE 2 & 3: CHAT WINDOW (Rectangle or Full Screen) ---
  return (
    <div 
      className={`fixed z-50 bg-white flex flex-col transition-all duration-300 ${
        isFullScreen 
          ? 'inset-0 w-full h-full' // Full screen classes
          : 'bottom-6 right-6 w-[400px] h-[600px] rounded-2xl shadow-2xl border border-gray-200' // Rectangle classes
      }`}
    >
      {/* Chat Header */}
      <div className={`bg-blue-600 text-white p-4 flex justify-between items-center ${isFullScreen ? '' : 'rounded-t-2xl'}`}>
        <div className="flex items-center gap-2">
          <Bot size={24} />
          <h2 className="font-bold text-lg">BLINC AI Assistant</h2>
        </div>
        <div className="flex gap-3">
          {/* Toggle Fullscreen Button */}
          <button onClick={() => setIsFullScreen(!isFullScreen)} className="hover:text-gray-200">
            {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          {/* Close Button */}
          <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none prose prose-sm'
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 p-3 rounded-2xl rounded-bl-none animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className={`p-4 bg-white border-t border-gray-200 flex gap-2 ${isFullScreen ? '' : 'rounded-b-2xl'}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about BLINC internships..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={!input.trim()}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}