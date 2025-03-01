
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const BookingForm: React.FC = () => {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would submit the booking data to a server
    console.log("Booking submitted:", {
      checkIn: date.from,
      checkOut: date.to,
      guests,
      roomType,
      name,
      email,
      phone
    });
    
    // Show success message (in a real app, this would be after API confirmation)
    alert("Booking request submitted successfully! We will contact you shortly to confirm your reservation.");
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-scale-in">
      <div className="bg-accent p-6">
        <h3 className="text-2xl font-display font-semibold text-accent-foreground">Book Your Stay</h3>
        <p className="text-accent-foreground/80 mt-1">
          Reserve your perfect getaway in the wilderness
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1">
            Check-in / Check-out Dates
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "MMM dd, yyyy")} - {format(date.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(date.from, "MMM dd, yyyy")
                  )
                ) : (
                  "Select your dates"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-1">
              Guests
            </label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
                <SelectItem value="6">6+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-1">
              Accommodation Type
            </label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deluxe">Deluxe Cottage</SelectItem>
                <SelectItem value="riverside">Riverside Suite</SelectItem>
                <SelectItem value="tree">Treehouse Villa</SelectItem>
                <SelectItem value="jungle">Jungle Cabin</SelectItem>
                <SelectItem value="luxury">Luxury Tent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1">
            Your Information
          </label>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300"
        >
          Request Booking
        </Button>
        
        <p className="text-xs text-center text-foreground/60 mt-4">
          By booking, you agree to our terms and conditions and privacy policy.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
