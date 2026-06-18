import { Send } from 'lucide-react';
import { CHAT_COPY } from '../../constants/chatConfig';

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}) {
  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <form
      onSubmit={onSubmit}
      className="px-4 pb-4 pt-2 shrink-0"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={CHAT_COPY.inputPlaceholder}
          disabled={isLoading}
          className="
            w-full py-3 pl-4 pr-14
            bg-white border border-gray-200 rounded-full
            text-sm text-gray-800 placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[var(--bitsy-purple)]/30 focus:border-[var(--bitsy-purple)]
            disabled:opacity-60 transition-all duration-200
          "
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="
            absolute right-1.5 w-9 h-9
            flex items-center justify-center
            bg-[var(--bitsy-purple)] text-white rounded-full
            hover:bg-[var(--bitsy-purple-dark)] active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 shadow-md
          "
        >
          <Send size={16} className="translate-x-px" />
        </button>
      </div>
    </form>
  );
}
