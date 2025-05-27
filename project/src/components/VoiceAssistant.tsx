import React, { useState, useEffect } from 'react';
import MicrophoneButton from './MicrophoneButton';
import CommandDisplay from './CommandDisplay';
import ResponseDisplay from './ResponseDisplay';
import ConversationHistory from './ConversationHistory';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { processCommand } from '../utils/processCommand';
import { Conversation } from '../types';

const VoiceAssistant: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const { 
    text, 
    isListening, 
    startListening, 
    stopListening, 
    hasRecognitionSupport 
  } = useSpeechRecognition();

  useEffect(() => {
    if (text && !isListening && text.trim() !== '') {
      handleCommandProcess(text);
    }
  }, [text, isListening]);

  const handleCommandProcess = async (command: string) => {
    setIsProcessing(true);
    
    // Add user command to conversations
    const newConversation: Conversation = {
      id: Date.now(),
      command,
      response: '',
      timestamp: new Date().toISOString()
    };
    
    setConversations(prev => [...prev, newConversation]);
    
    try {
      // Process the command and get a response
      const response = await processCommand(command);
      setCurrentResponse(response);
      
      // Update the conversation with the response
      setConversations(prev => 
        prev.map(conv => 
          conv.id === newConversation.id 
            ? { ...conv, response } 
            : conv
        )
      );
    } catch (error) {
      console.error('Error processing command:', error);
      setCurrentResponse('Sorry, I had trouble processing that request.');
      
      // Update conversation with error message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === newConversation.id 
            ? { ...conv, response: 'Sorry, I had trouble processing that request.' } 
            : conv
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMicrophoneClick = () => {
    if (isListening) {
      stopListening();
    } else {
      setCurrentResponse('');
      startListening();
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4">
      {!hasRecognitionSupport && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-md">
          <p className="font-medium">Browser not supported</p>
          <p>Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.</p>
        </div>
      )}
      
      <div className="flex-grow overflow-y-auto mb-4">
        <ConversationHistory conversations={conversations} />
      </div>

      <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
        <CommandDisplay 
          text={text} 
          isListening={isListening} 
        />
        
        <ResponseDisplay 
          response={currentResponse} 
          isProcessing={isProcessing} 
        />
        
        <MicrophoneButton 
          onClick={handleMicrophoneClick} 
          isListening={isListening}
          isProcessing={isProcessing}
          disabled={!hasRecognitionSupport}
        />
      </div>
    </div>
  );
};

export default VoiceAssistant;