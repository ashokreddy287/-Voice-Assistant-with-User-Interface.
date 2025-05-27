import React, { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';

interface ResponseDisplayProps {
  response: string;
  isProcessing: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ 
  response, 
  isProcessing 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset and start typing animation when response changes
  useEffect(() => {
    if (response && response !== displayText) {
      setDisplayText('');
      setCurrentIndex(0);
      setIsTyping(true);
    }
  }, [response]);

  // Handle typing animation
  useEffect(() => {
    if (isTyping && currentIndex < response.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + response[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 30); // Speed of typing
      
      return () => clearTimeout(timeout);
    } else if (currentIndex >= response.length) {
      setIsTyping(false);
    }
  }, [isTyping, currentIndex, response]);

  if (!response && !isProcessing) {
    return null;
  }

  return (
    <div className="w-full mt-4">
      <div className="flex items-center mb-2">
        <Bot className="w-5 h-5 text-purple-500 mr-2" />
        <h2 className="text-lg font-medium text-gray-700">Assistant Response</h2>
      </div>
      
      <div className="min-h-20 p-4 rounded-lg bg-purple-50 border border-purple-100 w-full">
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce\" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <span className="ml-2 text-purple-700">Processing...</span>
          </div>
        ) : (
          <p className="text-gray-800">{displayText}{isTyping && <span className="inline-block w-2 ml-1 h-4 bg-purple-500 animate-pulse"></span>}</p>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;