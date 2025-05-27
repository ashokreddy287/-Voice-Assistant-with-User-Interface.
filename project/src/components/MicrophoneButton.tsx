import React from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';

interface MicrophoneButtonProps {
  onClick: () => void;
  isListening: boolean;
  isProcessing: boolean;
  disabled?: boolean;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  onClick,
  isListening,
  isProcessing,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className={`
        relative
        w-16 h-16
        rounded-full
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${isListening 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isProcessing ? 'bg-purple-500' : ''}
        shadow-lg
      `}
      aria-label={isListening ? 'Stop listening' : 'Start listening'}
    >
      {isProcessing ? (
        <Loader className="w-6 h-6 text-white animate-spin" />
      ) : isListening ? (
        <>
          <Mic className="w-6 h-6 text-white" />
          <span className="animate-ping absolute w-full h-full rounded-full bg-red-400 opacity-75"></span>
        </>
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
    </button>
  );
};

export default MicrophoneButton;