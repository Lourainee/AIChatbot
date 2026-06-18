import { X, Maximize2, Minimize2 } from 'lucide-react';
import { CHAT_COPY } from '../../constants/chatConfig';

export default function ChatHeader({
  hasStartedChat,
  isFullScreen,
  onClose,
  onToggleFullscreen,
}) {
  return (
    <div className="flex items-start justify-between px-4 pt-4 pb-2 shrink-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="p-1.5 rounded-lg text-[var(--bitsy-text-dark)] hover:bg-white/60 transition-colors"
        >
          <X size={20} strokeWidth={2} />
        </button>

        {hasStartedChat && (
          <div>
            <h2 className="font-bold text-lg text-[var(--bitsy-text-dark)] leading-tight">
              {CHAT_COPY.chatTitle}
            </h2>
            <p className="text-sm text-[var(--bitsy-text-muted)]">{CHAT_COPY.onlineStatus}</p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onToggleFullscreen}
        aria-label={isFullScreen ? 'Exit fullscreen' : 'Expand to fullscreen'}
        className="p-1.5 rounded-lg text-[var(--bitsy-text-dark)] hover:bg-white/60 transition-colors"
      >
        {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </button>
    </div>
  );
}
