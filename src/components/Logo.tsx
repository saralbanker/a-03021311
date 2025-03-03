
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10 overflow-hidden">
        <div className="absolute inset-0 bg-accent rounded-md transform rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xl">DA</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-display font-bold text-accent leading-tight group-hover:text-accent/90 transition-colors duration-300">
          Dandeli
        </span>
        <span className="text-xs font-medium text-accent/80 -mt-1 group-hover:text-accent/70 transition-colors duration-300">
          Adventures
        </span>
      </div>
    </Link>
  );
};

export default Logo;
