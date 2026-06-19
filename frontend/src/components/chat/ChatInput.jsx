import { Send } from 'lucide-react';
import { CHAT_COPY } from '../../constants/chatConfig';

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  centered = false,
  isWelcomeScreen = false,
  isPopup = false,
  isActiveFullscreen = false,
  compact = false,
}) {
  const isTyped = input.trim().length > 0;
  const canSend = isTyped && !isLoading;
  const isCompactFullscreen = compact && !isPopup && !isActiveFullscreen;

  return (
    <form
      onSubmit={onSubmit}
      className={`shrink-0 w-full ${
        isPopup
          ? 'popup-input-form'
          : isActiveFullscreen
            ? 'active-chat-input-form'
            : isCompactFullscreen
              ? 'px-6 pb-4 sm:pb-5 pt-2 flex justify-center'
              : centered
                ? 'flex justify-center'
                : 'px-6 pb-6 sm:pb-8 pt-2'
      }`}
    >
      <div
        className={`
          relative flex items-center w-full
          ${isActiveFullscreen
            ? 'active-chat-input-wrap'
            : isCompactFullscreen
              ? 'max-w-[720px]'
              : !isPopup && centered
                ? 'w-[min(980px,90vw)] sm:w-[70%] sm:min-w-[600px]'
                : !isPopup
                  ? 'max-w-[980px] mx-auto'
                  : ''
          }
        `}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={CHAT_COPY.inputPlaceholder}
          disabled={isLoading}
            className={`
            w-full
            bg-[var(--bitsy-surface)] border-2 border-[var(--bitsy-stroke)] rounded-full
            text-[var(--bitsy-text-primary)] placeholder:text-[var(--bitsy-text-muted)]
            bitsy-shadow-md
            focus:outline-none focus:ring-2 focus:ring-[var(--bitsy-stroke)]/20
            disabled:opacity-60 transition-all duration-200
            ${isActiveFullscreen
              ? 'active-chat-input-field'
              : isCompactFullscreen
                ? 'h-12 pl-5 pr-12 text-base'
                : isPopup
                  ? 'popup-input-field'
                  : isWelcomeScreen
                    ? 'welcome-input-field pl-8'
                    : 'h-[76px] pl-8 pr-[4.5rem] text-[clamp(1.125rem,2.5vw,1.625rem)]'
            }
          `}
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className={`
            absolute right-1.5 top-1/2 rounded-full chat-send-button ${isTyped ? 'chat-send-button--active' : ''}
            bg-gradient-to-br from-[var(--bitsy-accent-start)] to-[var(--bitsy-accent-end)]
            text-white shadow-[0_4px_14px_var(--bitsy-shadow)]
            flex items-center justify-center
            ${isTyped ? 'hover:scale-[1.04] hover:brightness-110 hover:shadow-[0_10px_24px_var(--bitsy-shadow)]' : 'hover:shadow-[0_6px_18px_var(--bitsy-shadow)]'}
            active:scale-95 disabled:opacity-45 disabled:cursor-not-allowed
            transition-all duration-200
            ${isActiveFullscreen
              ? 'active-chat-send-btn'
              : isCompactFullscreen
                ? 'w-9 h-9'
                : isPopup
                  ? 'popup-send-btn'
                  : isWelcomeScreen
                    ? 'welcome-send-btn'
                    : 'w-[60px] h-[60px]'
            }
          `}
        >
          <Send
            size={isActiveFullscreen ? 22 : isCompactFullscreen ? 16 : isPopup ? 14 : 24}
            className="translate-x-px"
          />
        </button>
      </div>
    </form>
  );
}
