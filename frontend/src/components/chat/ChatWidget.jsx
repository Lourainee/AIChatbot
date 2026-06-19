import { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import ChatLauncher from './ChatLauncher';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const {
    messages,
    input,
    setInput,
    isLoading,
    hasStartedChat,
    handleSuggestionClick,
    handleSubmit,
    resetChat,
  } = useChat();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setIsFullScreen(false);
    resetChat();
  };

  const handleToggleFullscreen = () => setIsFullScreen((prev) => !prev);

  return (
    <>
      {(!isOpen || !isFullScreen) && (
        <ChatLauncher onClick={handleOpen} isOpen={isOpen} />
      )}

      {isOpen && (
        <ChatWindow
          isFullScreen={isFullScreen}
          hasStartedChat={hasStartedChat}
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onClose={handleClose}
          onToggleFullscreen={handleToggleFullscreen}
          onSubmit={handleSubmit}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </>
  );
}
