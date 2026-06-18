import { useState, useCallback, useRef } from 'react';
import { MOCK_REPLIES, MOCK_REPLY_DELAY_MS } from '../constants/chatConfig';

let messageId = 0;

function createMessage(sender, text) {
  messageId += 1;
  return {
    id: messageId,
    sender,
    text,
    timestamp: new Date(),
  };
}

export function useChatMock() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const replyIndexRef = useRef(0);

  const getNextMockReply = useCallback(() => {
    const reply = MOCK_REPLIES[replyIndexRef.current % MOCK_REPLIES.length];
    replyIndexRef.current += 1;
    return reply;
  }, []);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text?.trim();
    if (!trimmed || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, createMessage('user', trimmed)]);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, MOCK_REPLY_DELAY_MS));

    setMessages((prev) => [...prev, createMessage('bot', getNextMockReply())]);
    setIsLoading(false);
  }, [isLoading, getNextMockReply]);

  const handleSuggestionClick = useCallback((label) => {
    sendMessage(label);
  }, [sendMessage]);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    sendMessage(input);
  }, [input, sendMessage]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
  }, []);

  return {
    messages,
    input,
    setInput,
    isLoading,
    hasStartedChat: messages.length > 0,
    sendMessage,
    handleSuggestionClick,
    handleSubmit,
    resetChat,
  };
}
