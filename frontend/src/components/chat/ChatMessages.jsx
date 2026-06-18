import { useRef, useEffect } from 'react';
import { CHAT_COPY } from '../../constants/chatConfig';

function formatTimestamp(date) {
  const now = new Date();
  const diffMs = now - date;
  if (diffMs < 60000) return CHAT_COPY.timestampJustNow;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatMessages({ messages, isLoading, isPopup = false }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className={`flex flex-col gap-3 ${isPopup ? 'py-1' : 'flex-1 overflow-y-auto px-4 py-2 min-h-0'}`}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`max-w-[85%] px-4 py-2.5 rounded-2xl leading-relaxed bitsy-shadow-sm transition-all duration-200 animate-[slideUpFadeIn_0.25s_ease-out] text-[var(--bitsy-text-primary)] ${isPopup ? 'text-xs px-3 py-2' : 'text-sm'} ${
              msg.sender === 'user'
                ? 'bg-[var(--bitsy-user-bubble)] rounded-br-md'
                : 'bg-[var(--bitsy-bot-bubble)] rounded-bl-md'
            }`}
          >
            {msg.text}
          </div>
          <span className="text-[10px] text-[var(--bitsy-text-muted)] mt-1 px-1">
            {formatTimestamp(msg.timestamp)}
          </span>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-[var(--bitsy-bot-bubble)] px-4 py-3 rounded-2xl rounded-bl-md bitsy-shadow-sm flex gap-1.5 items-center">
            <span className="typing-dot w-2 h-2 rounded-full bg-[var(--bitsy-text-primary)]" />
            <span className="typing-dot w-2 h-2 rounded-full bg-[var(--bitsy-text-primary)]" />
            <span className="typing-dot w-2 h-2 rounded-full bg-[var(--bitsy-text-primary)]" />
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
