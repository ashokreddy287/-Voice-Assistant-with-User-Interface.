import React from 'react';
import { Mic } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center">
        <div className="bg-white/20 p-2 rounded-full mr-3">
          <Mic className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Voice Assistant</h1>
      </div>
    </header>
  );
};

export default Header;