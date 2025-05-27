import React from 'react';
import Header from './components/Header';
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-start justify-center p-4 pt-8 overflow-y-auto">
        <VoiceAssistant />
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        © 2025 Voice Assistant | Built with Web Speech API
      </footer>
    </div>
  );
}

export default App;