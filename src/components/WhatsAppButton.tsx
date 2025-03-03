
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+918904704234'; // Updated phone number
  const message = encodeURIComponent("Hi! I'm interested in booking an adventure at Dandeli.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 left-6 z-50",
        "w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg",
        "flex items-center justify-center",
        "transition-all duration-300 hover:scale-110",
        "animate-[pulse_2s_infinite]"
      )}
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Using a more WhatsApp-like icon */}
        <MessageSquare size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></span>
      </div>
    </a>
  );
};

export default WhatsAppButton;
