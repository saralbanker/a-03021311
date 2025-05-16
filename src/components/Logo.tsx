
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-14 h-14 overflow-hidden">
        <img 
          src="/lovable-uploads/8c006412-1448-466a-8956-2c468ff3a100.png" 
          alt="HME Boilers Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-display font-bold text-red-600 leading-tight group-hover:text-red-700 transition-colors duration-300">
          HME Boilers
        </span>
      </div>
    </Link>
  );
};

export default Logo;
