import { MessageCircle, Zap, Target, Heart } from 'lucide-react';

interface LandingBannerProps {
  onSend: (message: string) => void;
}

export default function LandingBanner({ onSend }: LandingBannerProps) {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center space-y-8 px-4">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-slate-900">
            Chat with <span className="text-emerald-500">AI</span> Assistant
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get instant answers, creative help, and intelligent conversations. 
            Fast, reliable, and always ready to assist.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-slate-900">Start Chatting</h3>
              <p className="text-sm text-slate-600">Type your message below to begin</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-slate-900">Instant Response</h3>
              <p className="text-sm text-slate-600">Get answers in seconds</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-slate-900">Smart Solutions</h3>
              <p className="text-sm text-slate-600">Intelligent and helpful responses</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message to start chatting..."
                className="w-full px-4 py-3 pr-12 border border-slate-200 placeholder-gray-400 text-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    onSend(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    onSend(input.value);
                    input.value = '';
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 hover:bg-emerald-600 text-black rounded-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-600 text-center sm:text-left">
            <span className="flex items-center gap-1">
              Created with <Heart className="w-4 h-4 text-rose-900" /> by
            </span>
            <a
              href="https://github.com/kashewknutt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Rajat Disawal
            </a>
          </div>
          <div className="text-xs text-slate-400">
            Experience the power of AI conversation
          </div> 
        </div>
      </div>
    </div>
  );
}