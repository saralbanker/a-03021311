
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, Loader2, PartyPopper, Sparkle } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sendBookingConfirmations } from "@/utils/email-service";
import { useToast } from "@/hooks/use-toast";

// Define the booking interface that includes bookingReference
interface BookingDetails extends z.infer<typeof FormSchema> {
  bookingReference?: string;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^(\+?\d{1,4}[\s-])?(?!0+\s)(?!0+$)\d{8,12}$/, {
    message: "Please enter a valid phone number.",
  }),
  adults: z.string().refine((value) => parseInt(value) > 0, {
    message: "Number of adults must be greater than 0.",
  }),
  children: z.string(),
  checkInDate: z.date({
    required_error: "Please select a check-in date.",
  }),
  checkOutDate: z.date({
    required_error: "Please select a check-out date.",
  }),
}).refine((data) => data.checkOutDate > data.checkInDate, {
  message: "Check-out date must be after check-in date",
  path: ["checkOutDate"],
});

interface BookingFormProps {
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [bookingDetails, setBookingDetails] = React.useState<BookingDetails | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      adults: "1",
      children: "0",
      checkInDate: new Date(),
      checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  });

  async function handleFormSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      // Generate a simple booking reference
      const bookingReference = `BK${Date.now().toString().slice(-6)}`;
      
      // Store booking details for confirmation dialog
      setBookingDetails({ ...values, bookingReference });
      
      // Send confirmation emails and SMS
      await sendBookingConfirmations({
        ...values,
        bookingReference,
      }, bookingReference);
      
      // Show confirmation dialog
      setShowConfirmation(true);
      
      // Show success toast
      toast({
        title: "Booking Successful!",
        description: "Check your email and phone for booking details.",
      });
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Error",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Adults</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Children</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => i).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="checkInDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Check-in Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="checkOutDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Check-out Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <= form.getValues("checkInDate") || date < new Date()
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Book Now"
            )}
          </Button>
        </form>
      </Form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-3">
            <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center animate-scale-in">
              <Check className="h-8 w-8 text-green-600 animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
            <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2 animate-fade-in">
              <PartyPopper className="h-5 w-5 text-yellow-500" />
              Booking Confirmed!
              <Sparkle className="h-5 w-5 text-blue-500 animate-[pulse_3s_ease-in-out_infinite]" />
            </DialogTitle>
            <DialogDescription className="text-center animate-fade-in animation-delay-200">
              Thank you for your booking. Here are your details:
            </DialogDescription>
          </DialogHeader>
          {bookingDetails && (
            <div className="mt-4 space-y-3 animate-fade-in animation-delay-400 bg-muted/50 p-4 rounded-lg">
              <p className="flex justify-between">
                <span className="font-medium">Booking Reference:</span> 
                <span className="text-accent">{bookingDetails.bookingReference}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Name:</span> 
                <span>{bookingDetails.name}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Check-in Date:</span> 
                <span>{format(bookingDetails.checkInDate, "PPP")}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Check-out Date:</span> 
                <span>{format(bookingDetails.checkOutDate, "PPP")}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Guests:</span> 
                <span>{bookingDetails.adults} Adults, {bookingDetails.children} Children</span>
              </p>
              <div className="text-sm text-muted-foreground mt-6 bg-green-50 p-3 rounded-md border border-green-100 shadow-sm animate-fade-in animation-delay-600">
                <p className="text-center">
                  A confirmation has been sent to your email 
                  <span className="font-medium"> ({bookingDetails.email})</span> and 
                  phone number <span className="font-medium">({bookingDetails.phone})</span>.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
