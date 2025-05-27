import React, { useRef, useEffect } from 'react';
import { User, Bot } from 'lucide-react';
import { Conversation } from '../types';

interface ConversationHistoryProps {
  conversations: Conversation[];
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ conversations }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations]);

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <Bot className="w-12 h-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Voice Assistant</h2>
        <p className="text-gray-500 max-w-md">
          Click the microphone button and speak to interact with your voice assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <div key={conversation.id} className="space-y-2">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-blue-50 p-3 rounded-lg rounded-tl-none max-w-[85%]">
              <p className="text-gray-800">{conversation.command}</p>
              <span className="text-xs text-gray-500">
                {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          {conversation.response && (
            <div className="flex items-start justify-end">
              <div className="bg-purple-50 p-3 rounded-lg rounded-tr-none max-w-[85%]">
                <p className="text-gray-800">{conversation.response}</p>
                <span className="text-xs text-gray-500">
                  {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center ml-2">
                <Bot className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ConversationHistory;