import { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import ChatLauncher from './ChatLauncher';
import ChatWindow from './ChatWindow';

export default function ChatWidget({ chatOpen, onChatOpen, onChatClose }) {
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

  const handleClose = () => {
    setIsFullScreen(false);
    resetChat();
    onChatClose();
  };

  const handleToggleFullscreen = () => setIsFullScreen((prev) => !prev);

  return (
    <>
      <ChatLauncher onClick={chatOpen ? onChatClose : onChatOpen} isOpen={chatOpen} />

      {chatOpen && (
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
