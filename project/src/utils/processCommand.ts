// This file contains the logic to process voice commands
// and generate appropriate responses

/**
 * Process a voice command and return an appropriate response
 * In a real application, this would connect to a backend service or AI model
 */
export const processCommand = async (command: string): Promise<string> => {
  // Convert command to lowercase for easier matching
  const lowerCommand = command.toLowerCase();
  
  // Simulate processing delay for demonstration purposes
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple command matching logic
  if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
    return 'Hello there! How can I help you today?';
  }
  
  if (lowerCommand.includes('time')) {
    const now = new Date();
    return `The current time is ${now.toLocaleTimeString()}.`;
  }
  
  if (lowerCommand.includes('date') || lowerCommand.includes('day')) {
    const now = new Date();
    return `Today is ${now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}.`;
  }
  
  if (lowerCommand.includes('weather')) {
    return 'I\'m sorry, I don\'t have access to weather information at the moment. In a real application, this would connect to a weather API.';
  }
  
  if (lowerCommand.includes('joke')) {
    const jokes = [
      'Why don\'t scientists trust atoms? Because they make up everything!',
      'Why did the scarecrow win an award? Because he was outstanding in his field!',
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
      'What do you call a fake noodle? An impasta!',
      'Why don\'t eggs tell jokes? They\'d crack each other up.'
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  if (lowerCommand.includes('name')) {
    return 'I\'m your Voice Assistant, built with React and the Web Speech API.';
  }
  
  if (lowerCommand.includes('thank')) {
    return 'You\'re welcome! Is there anything else I can help you with?';
  }
  
  if (lowerCommand.includes('bye') || lowerCommand.includes('goodbye')) {
    return 'Goodbye! Have a great day!';
  }
  
  // Default response for unrecognized commands
  return 'I\'m not sure how to respond to that. Try asking about the time, date, a joke, or say hello.';
};