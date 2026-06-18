import { CHAT_COPY } from '../../constants/chatConfig';

export default function ChatWelcome() {
  return (
    <div className="flex flex-col items-center text-center px-6 py-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--bitsy-text-dark)] mb-4">
        {CHAT_COPY.welcomeTitle}
      </h1>
      <img
        src="/bitsy-mascot.png"
        alt="Bitsy"
        className="w-32 h-32 sm:w-44 sm:h-44 object-contain mb-4 drop-shadow-md"
        draggable={false}
      />
      <p className="text-[var(--bitsy-text-muted)] text-sm sm:text-base">
        {CHAT_COPY.welcomeSubtitle}
      </p>
    </div>
  );
}
