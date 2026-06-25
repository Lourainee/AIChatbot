import { useState, useEffect, useRef } from 'react';
import { CHAT_COPY } from '../../constants/chatConfig';

export default function ChatLauncher({ onClick, isOpen }) {
  const size = 112; // w-28 = 7rem = 112px
  const [pos, setPos] = useState(() => ({
    x: window.innerWidth - size - 24,
    y: window.innerHeight - size - 24,
  }));
  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const snapToCorner = (x, y) => {
    const pad = 24;
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;
    return {
      x: x + size / 2 < midX ? pad : window.innerWidth - size - pad,
      y: y + size / 2 < midY ? pad : window.innerHeight - size - pad,
    };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      moved.current = true;
      setPos({
        x: Math.min(Math.max(0, clientX - offset.current.x), window.innerWidth - size),
        y: Math.min(Math.max(0, clientY - offset.current.y), window.innerHeight - size),
      });
    };
    const onUp = (e) => {
      if (!dragging.current) return;
      dragging.current = false;
      if (moved.current) {
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        const x = Math.min(Math.max(0, clientX - offset.current.x), window.innerWidth - size);
        const y = Math.min(Math.max(0, clientY - offset.current.y), window.innerHeight - size);
        setPos(snapToCorner(x, y));
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const onPointerDown = (e) => {
    if (isOpen) {
      moved.current = false;
      return;
    }
    moved.current = false;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offset.current = { x: clientX - pos.x, y: clientY - pos.y };
    dragging.current = true;
  };

  const handleClick = () => {
    if (!moved.current) onClick();
  };

  return (
    <button
      type="button"
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
      onClick={handleClick}
      aria-label={isOpen ? 'Minimize chat' : CHAT_COPY.launcherLabel}
      aria-expanded={isOpen}
      style={{
        left: pos.x,
        top: pos.y,
        transition: dragging.current ? 'none' : 'left 0.3s ease, top 0.3s ease',
      }}
      className={`
        fixed z-[60] flex items-center justify-center
        bg-transparent border-0 p-0 m-0 appearance-none
        outline-none focus-visible:ring-2 focus-visible:ring-[var(--bitsy-stroke)] focus-visible:ring-offset-2 rounded-full
        select-none
        ${isOpen
          ? 'w-20 h-20 sm:w-24 sm:h-24 cursor-pointer hover:scale-110 active:scale-95'
          : 'w-28 h-28 sm:w-32 sm:h-32 hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing'
        }
      `}
    >
      <img
        src="/bitsy-mascot.png"
        alt="Bitsy mascot"
        className={`w-full h-full object-contain pointer-events-none select-none ${
          isOpen ? 'drop-shadow-lg' : 'chat-launcher-pulse'
        }`}
        draggable={false}
      />
    </button>
  );
}
