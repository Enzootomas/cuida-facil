import { useState } from 'react';
import { ArrowLeft, Send, Phone } from 'lucide-react';
import type { View, UserType } from '../App';

interface MessagesProps {
  onNavigate: (view: View) => void;
  userType: UserType;
}

const conversations = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Tutora',
    lastMessage: 'Pode confirmar o horário de amanhã?',
    time: '10:30',
    unread: 2,
    phone: '(11) 91234-5678',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Maria Silva',
    role: 'Cuidadora',
    lastMessage: 'Entendido, estarei lá às 14h',
    time: 'Ontem',
    unread: 0,
    phone: '(11) 99999-1111',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
  }
];

export function Messages({ onNavigate, userType }: MessagesProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: 'other', text: 'Olá! Tudo bem?', time: '10:25' },
    { id: 2, sender: 'other', text: 'Pode confirmar o horário de amanhã?', time: '10:30' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        id: chatMessages.length + 1,
        sender: 'me',
        text: message,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setMessage('');
  };

  const getBackView = (): View => {
    if (userType === 'tutor') return 'tutor';
    if (userType === 'partner') return 'partner';
    return 'home';
  };

  if (selectedChat === null) {
    return (
      <div className="h-[100dvh] bg-gray-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-6 sm:p-6 sm:pb-8 flex-shrink-0">
          <button
            onClick={() => onNavigate(getBackView())}
            className="flex items-center gap-2 mb-4 sm:mb-6 active:opacity-70"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-base sm:text-lg">Voltar</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Mensagens</h1>
          <p className="text-blue-100 text-sm sm:text-base">Suas conversas</p>
        </div>

        <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 sm:px-6 -mt-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {conversations.map((conv, index) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 hover:bg-gray-50 transition-colors text-left ${
                  index !== conversations.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.photo}
                    alt={conv.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                  />
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base truncate">{conv.name}</h3>
                    <span className="text-gray-400 text-xs sm:text-sm flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-blue-600 text-xs sm:text-sm font-medium mb-0.5">{conv.role}</p>
                  <p className="text-gray-500 text-xs sm:text-sm truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>
    );
  }

  const currentConv = conversations.find(c => c.id === selectedChat);

  return (
    <div className="h-[100dvh] bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white px-3 sm:px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => setSelectedChat(null)}
            className="flex items-center gap-1 active:opacity-70 p-1"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 mx-2 sm:mx-4 min-w-0">
            <img
              src={currentConv?.photo}
              alt={currentConv?.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="text-left min-w-0">
              <p className="text-white font-semibold text-sm sm:text-base truncate">{currentConv?.name}</p>
              <p className="text-blue-100 text-xs truncate">{currentConv?.role}</p>
            </div>
          </div>
          <a
            href={`tel:${currentConv?.phone}`}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 flex-shrink-0 active:scale-95"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </a>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 max-w-md mx-auto w-full">
        <div className="space-y-3 sm:space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 ${
                  msg.sender === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow'
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                <p
                  className={`text-[11px] sm:text-xs mt-1 text-right ${
                    msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
        <form onSubmit={handleSendMessage} className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 min-w-0 px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-base"
          />
          <button
            type="submit"
            className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0 active:scale-95"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
