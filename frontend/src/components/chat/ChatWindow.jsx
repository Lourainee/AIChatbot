import ChatHeader from './ChatHeader';
import ChatWelcome from './ChatWelcome';
import ChatMessages from './ChatMessages';
import SuggestionChips from './SuggestionChips';
import ChatInput from './ChatInput';

export default function ChatWindow({
  isFullScreen,
  hasStartedChat,
  messages,
  input,
  setInput,
  isLoading,
  onClose,
  onToggleFullscreen,
  onSubmit,
  onSuggestionClick,
}) {
  return (
    <div
      className={`
        fixed z-50 flex flex-col overflow-hidden
        bg-gradient-to-b from-[var(--bitsy-bg-start)] to-[var(--bitsy-bg-end)]
        shadow-2xl border-2 border-[var(--bitsy-text-dark)]/15
        transition-all duration-300 ease-out
        chat-window-enter
        ${isFullScreen
          ? 'inset-0 w-full h-full rounded-none'
          : `
            bottom-[7rem] right-3 sm:bottom-32 sm:right-6
            w-[min(400px,calc(100vw-1.5rem))]
            h-[min(620px,calc(100vh-7rem))]
            max-sm:h-[min(560px,calc(100vh-6rem))]
            rounded-3xl
          `
        }
      `}
      role="dialog"
      aria-label="Bitsy chat"
    >
      <ChatHeader
        hasStartedChat={hasStartedChat}
        isFullScreen={isFullScreen}
        onClose={onClose}
        onToggleFullscreen={onToggleFullscreen}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {!hasStartedChat ? (
          <ChatWelcome />
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}

        <SuggestionChips
          onSuggestionClick={onSuggestionClick}
          disabled={isLoading}
          showSubtitle={hasStartedChat}
        />
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
