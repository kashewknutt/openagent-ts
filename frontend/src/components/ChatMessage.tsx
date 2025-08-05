import { User, Bot, Info, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

interface Source {
  index: number;
  source: string;
}

interface ChatMessageProps {
  sender: 'user' | 'agent';
  text: string;
  sources?: Source[];
}

export default function ChatMessage({ sender, text, sources }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const isUser = sender === 'user';

  return (
    <>
      <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-emerald-600" />
          </div>
        )}
        
        <div className={`relative max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-emerald-500 text-white rounded-br-sm' 
            : 'bg-white border border-slate-200 text-slate-900 rounded-bl-sm'
        }`}>
          <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
          
          {!isUser && sources && sources.length > 0 && (
            <button 
              onClick={() => setShowSources(true)}
              className="absolute bottom-1 right-1 p-1 cursor-pointer text-slate-400 hover:text-slate-600"
            >
              <Info className="w-3 h-3" />
            </button>
          )}
        </div>

        {isUser && (
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-slate-600" />
          </div>
        )}
      </div>

      {showSources && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-gray-600 font-semibold">Sources</h3>
              <button 
                onClick={() => setShowSources(false)}
                className="p-1 hover:bg-slate-100 cursor-pointer rounded-full"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="space-y-2">
              {sources?.map((source) => (
                <div key={source.index} className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">{source.index}.</span>
                  <span className="text-slate-700">{source.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}