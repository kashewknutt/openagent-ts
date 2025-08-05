import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  sender: 'user' | 'agent';
  text: string;
}

export default function ChatMessage({ sender, text }: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-emerald-600" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser 
          ? 'bg-emerald-500 text-white rounded-br-sm' 
          : 'bg-white border border-slate-200 text-slate-900 rounded-bl-sm'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{text}</p>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-slate-600" />
        </div>
      )}
    </div>
  );
}