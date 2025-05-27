import React from 'react';

interface CommandDisplayProps {
  text: string;
  isListening: boolean;
}

const CommandDisplay: React.FC<CommandDisplayProps> = ({ text, isListening }) => {
  return (
    <div className="w-full text-center">
      <h2 className="text-lg font-medium text-gray-700 mb-2">
        {isListening ? 'Listening...' : 'Your Command'}
      </h2>
      <div 
        className={`
          min-h-16 p-3 rounded-lg 
          border border-gray-200
          bg-gray-50
          w-full
          flex items-center justify-center
          transition-all duration-300
          ${isListening ? 'border-blue-300 shadow-md' : ''}
        `}
      >
        {text ? (
          <p className="text-lg text-gray-800">{text}</p>
        ) : (
          <p className="text-gray-400 italic">
            {isListening 
              ? 'Speak now...' 
              : 'Click the microphone button and speak your command'
            }
          </p>
        )}
        {isListening && (
          <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </div>
    </div>
  );
};

export default CommandDisplay;