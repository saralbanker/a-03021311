
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PromotionBannerProps {
  title: string;
  description: string;
  code: string;
  backgroundClass: string;
  textColorClass: string;
  linkPath: string;
  discountPercentage?: number;
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({
  title,
  description,
  code,
  backgroundClass = "bg-green-600",
  textColorClass = "text-white",
  linkPath,
  discountPercentage
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className={`${backgroundClass} ${textColorClass} w-full`}>
      <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-6">
          <div>
            <span className="font-semibold">{title}</span>
            {discountPercentage && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-md text-sm font-bold">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          
          <div className="hidden sm:block">•</div>
          
          <div className="text-sm">{description}</div>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/25 rounded font-mono text-sm">
              {code}
            </span>
            <Link 
              to={linkPath} 
              className={`text-sm ${textColorClass} underline font-medium hover:opacity-90`}
            >
              Book Now
            </Link>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-white/10"
            aria-label="Close promotion"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
