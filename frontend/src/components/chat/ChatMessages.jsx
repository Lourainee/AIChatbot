import { useRef, useEffect } from 'react';
import { CHAT_COPY } from '../../constants/chatConfig';

function formatTimestamp(date) {
  const now = new Date();
  const diffMs = now - date;
  if (diffMs < 60000) return CHAT_COPY.timestampJustNow;

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes}${period}`;
}

function getSenderLabel(sender) {
  return sender === 'user' ? CHAT_COPY.userLabel : CHAT_COPY.botLabel;
}

export default function ChatMessages({ messages, isLoading, isPopup = false, isFullScreen = false }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const isActiveFullscreen = isFullScreen && !isPopup;

  return (
    <div
      className={`flex flex-col ${
        isPopup
          ? 'gap-3 py-1'
          : isActiveFullscreen
            ? 'active-chat-messages gap-5'
            : 'flex-1 overflow-y-auto gap-3 px-4 py-2 min-h-0'
      }`}
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`leading-relaxed bitsy-shadow-sm transition-all duration-200 animate-[slideUpFadeIn_0.25s_ease-out] text-[var(--bitsy-text-primary)] ${
              isPopup
                ? 'max-w-[85%] px-3 py-2 text-xs rounded-2xl'
                : isActiveFullscreen
                  ? 'active-chat-bubble px-5 py-3.5 text-[15px] sm:text-base'
                  : 'max-w-[85%] px-4 py-2.5 text-sm rounded-2xl'
            } ${
              msg.sender === 'user'
                ? 'bg-[var(--bitsy-user-bubble)] active-chat-bubble-user'
                : 'bg-[var(--bitsy-bot-bubble)] active-chat-bubble-bot'
            }`}
          >
            {msg.text}
          </div>
          <span
            className={`text-[var(--bitsy-text-muted)] mt-1.5 px-1 ${
              isActiveFullscreen ? 'text-xs sm:text-sm' : 'text-[10px]'
            }`}
          >
            {getSenderLabel(msg.sender)} {formatTimestamp(msg.timestamp)}
          </span>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div
            className={`bg-[var(--bitsy-bot-bubble)] bitsy-shadow-sm flex gap-1.5 items-center active-chat-bubble active-chat-bubble-bot ${
              isPopup ? 'px-4 py-3 rounded-2xl rounded-bl-md' : 'px-5 py-3.5'
            }`}
          >
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
