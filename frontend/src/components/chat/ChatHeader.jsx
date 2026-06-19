import { ArrowLeft, Maximize2, Minimize2, X } from 'lucide-react';
import { CHAT_COPY } from '../../constants/chatConfig';

export default function ChatHeader({
  hasStartedChat,
  isFullScreen,
  isWelcomeScreen = false,
  isPopup = false,
  onClose,
  onToggleFullscreen,
}) {
  const CloseIcon = isPopup ? X : ArrowLeft;
  const showActiveTitle = hasStartedChat && (isFullScreen || isPopup);

  return (
    <div
      className={`
        relative flex items-center justify-between shrink-0
        ${isPopup
          ? 'popup-header'
          : isWelcomeScreen
            ? 'welcome-header px-6 sm:px-10'
            : hasStartedChat
              ? 'active-chat-header px-6 sm:px-10'
              : `px-6 sm:px-10 pt-6 sm:pt-10 ${hasStartedChat ? 'pb-2' : 'pb-10'}`
        }
      `}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close chat"
        className="relative z-10 p-1 text-[var(--bitsy-text-primary)] hover:opacity-70 transition-opacity shrink-0"
      >
        <CloseIcon size={isPopup ? 20 : 28} strokeWidth={2.5} />
      </button>

      {showActiveTitle && isFullScreen && !isPopup && (
        <div className="absolute inset-x-0 flex flex-col items-center pointer-events-none px-16">
          <h2 className="font-bold text-[var(--bitsy-text-primary)] leading-tight text-lg sm:text-xl">
            {CHAT_COPY.chatTitle}
          </h2>
          <p className="text-sm text-[var(--bitsy-text-muted)] mt-0.5">
            {CHAT_COPY.onlineStatus}
          </p>
        </div>
      )}

      {showActiveTitle && isPopup && (
        <div className="min-w-0 flex-1 px-2">
          <h2 className="font-bold text-[var(--bitsy-text-primary)] leading-tight truncate text-sm">
            {CHAT_COPY.chatTitle}
          </h2>
          <p className="text-xs text-[var(--bitsy-text-muted)]">
            {CHAT_COPY.onlineStatus}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onToggleFullscreen}
        aria-label={isFullScreen ? 'Exit fullscreen' : 'Expand to fullscreen'}
        className="relative z-10 p-1 text-[var(--bitsy-text-primary)] hover:opacity-70 transition-opacity shrink-0"
      >
        {isFullScreen
          ? <Minimize2 size={isPopup ? 20 : 28} strokeWidth={2.5} />
          : <Maximize2 size={isPopup ? 20 : 28} strokeWidth={2.5} />}
      </button>
    </div>
  );
}
