import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ChatWidget from './components/chat/ChatWidget';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <LandingPage onAskBitsy={() => setChatOpen(true)} />
      <ChatWidget
        chatOpen={chatOpen}
        onChatOpen={() => setChatOpen(true)}
        onChatClose={() => setChatOpen(false)}
      />
    </>
  );
}
