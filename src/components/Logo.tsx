
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-12 h-12 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 group-hover:from-green-500 group-hover:to-green-700 transition-colors duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 21L12 17L17 21V4C17 3.73478 16.8946 3.48043 16.7071 3.29289C16.5196 3.10536 16.2652 3 16 3H8C7.73478 3 7.48043 3.10536 7.29289 3.29289C7.10536 3.48043 7 3.73478 7 4V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 7.5C5 7.5 8 10 12 10C16 10 19 7.5 19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-display font-bold text-green-700 leading-tight group-hover:text-green-600 transition-colors duration-300">
          Dandeli
        </span>
        <span className="text-xs font-medium text-green-700/80 -mt-1 group-hover:text-green-600/70 transition-colors duration-300">
          Adventures
        </span>
      </div>
    </Link>
  );
};

export default Logo;
