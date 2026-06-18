import { SUGGESTIONS, CHAT_COPY } from '../../constants/chatConfig';

export default function SuggestionChips({ onSuggestionClick, disabled, showSubtitle }) {
  return (
    <div className="px-4 py-2 shrink-0">
      {showSubtitle && (
        <p className="text-center text-sm text-[var(--bitsy-text-muted)] mb-3">
          {CHAT_COPY.welcomeSubtitle}
        </p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {SUGGESTIONS.map((label) => (
          <button
            key={label}
            type="button"
            disabled={disabled}
            onClick={() => onSuggestionClick(label)}
            className="
              px-3 py-2.5 text-xs sm:text-sm text-[var(--bitsy-text-dark)] font-500
              bg-white border-2 border-gray-200 rounded-2xl shadow-sm
              hover:border-[var(--bitsy-purple)]/40 hover:bg-purple-50 hover:shadow-md
              active:scale-[0.98] transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              text-center truncate
            "
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
