
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useMobile } from "@/hooks/use-mobile";
import { DateRange } from "react-day-picker";

const BookingForm = () => {
  const isMobile = useMobile();
  
  // Using DateRange type from react-day-picker and ensuring 'to' is defined in our initial state
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", { date, guests, roomType, name, email });
    
    // In a real application, this would submit to a backend API
    alert("Thank you for your booking! We'll contact you shortly to confirm details.");
  };
  
  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur shadow-lg rounded-xl overflow-hidden border-0">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Select Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select your dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) => {
                    // Ensure range has a "to" date if from is selected
                    if (range?.from && !range.to) {
                      range.to = addDays(range.from, 1);
                    }
                    setDate(range || { from: new Date(), to: addDays(new Date(), 1) });
                  }}
                  numberOfMonths={isMobile ? 1 : 2}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <div className="relative">
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger id="guests">
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
                <Users className="absolute right-8 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="w-1/2 space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger id="roomType">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deluxe-cottage">Deluxe Cottage</SelectItem>
                  <SelectItem value="riverside-suite">Riverside Suite</SelectItem>
                  <SelectItem value="treehouse-villa">Treehouse Villa</SelectItem>
                  <SelectItem value="jungle-cabin">Jungle Cabin</SelectItem>
                  <SelectItem value="luxury-tent">Luxury Safari Tent</SelectItem>
                  <SelectItem value="family-bungalow">Family Bungalow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Your email address" 
              required 
            />
          </div>
          
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
            Book Now
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By booking, you agree to our terms and conditions. 
            A 30% deposit will be required to confirm your reservation.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
