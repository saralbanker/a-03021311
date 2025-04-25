
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AdPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in booking the Day Package for ₹799!");
    window.open(`https://wa.me/+918904704234?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Special Offer! 🎉
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-green-600">
              Day Package at Just ₹799!
            </h3>
            <p className="text-muted-foreground">
              Experience the best of Dandeli at an unbeatable price
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700"
            >
              Book Now on WhatsApp
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
