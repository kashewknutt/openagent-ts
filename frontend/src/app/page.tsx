// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import Navbar from '@/components/Navbar';
import LandingBanner from '@/components/LandingBanner';
import { getSessionId } from '@/lib/session';
import axios from 'axios';

interface Source {
  index: number;
  source: string;
}

interface Message {
  sender: 'user' | 'agent';
  text: string;
  sources?: Source[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const key = process.env.NEXT_PUBLIC_API_KEY || '';

  useEffect(() => {
    const id = getSessionId();
    setSessionId(id);
  }, []);

  const handleSend = async (message: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text: message }]);

    try {
      const res = await axios.post('https://openagent-ts-backend-365628037012.asia-south1.run.app/agent/message', {
        key,
        message,
        session_id: sessionId,
      });

      const reply = res.data?.reply || 'Error: No reply received';
      const sources = res.data?.sources;
      setMessages((prev) => [...prev, { sender: 'agent', text: reply, sources }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: 'Failed to get a response from backend.' },
      ]);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-20">
        {messages.length === 0 ? (
          <LandingBanner onSend={handleSend} />
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-[calc(100vh-8rem)] flex flex-col">
              <div className="flex-1 overflow-y-auto p-6">
                {messages.map((msg, i) => (
                  <ChatMessage 
                    key={i} 
                    sender={msg.sender} 
                    text={msg.text}
                    sources={msg.sources}
                  />
                ))}
              </div>
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}