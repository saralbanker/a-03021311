
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
import { CalendarIcon, Check, Loader2, PartyPopper, Sparkle, Clock } from "lucide-react";
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
import { useOtp } from "@/hooks/use-otp";
import { OtpInput } from "./OtpInput";

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
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [bookingDetails, setBookingDetails] = React.useState<BookingDetails | null>(null);
  const [showOtpDialog, setShowOtpDialog] = React.useState(false);
  const [formValues, setFormValues] = React.useState<z.infer<typeof FormSchema> | null>(null);
  const [countdownInterval, setCountdownInterval] = React.useState<NodeJS.Timeout | null>(null);
  const [otpValue, setOtpValue] = React.useState("");

  const { 
    isOtpSent,
    isVerifying, 
    otpError, 
    timeLeft, 
    setTimeLeft,
    sendOtp, 
    verifyOtp, 
    resendOtp 
  } = useOtp();

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

  React.useEffect(() => {
    if (isOtpSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      setCountdownInterval(timer);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && countdownInterval) {
      clearInterval(countdownInterval);
    }
  }, [isOtpSent, timeLeft, countdownInterval, setTimeLeft]);

  const handleFormSubmit = async (values: z.infer<typeof FormSchema>) => {
    setFormValues(values);
    setIsSubmitting(true);
    
    try {
      // Initiate OTP verification
      await sendOtp(values.phone);
      setShowOtpDialog(true);
    } catch (error) {
      console.error('OTP sending error:', error);
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpComplete = (otp: string) => {
    setOtpValue(otp);
  };

  const handleOtpVerification = async () => {
    if (!formValues) return;
    
    setIsSubmitting(true);
    try {
      const isValid = await verifyOtp(otpValue);
      
      if (isValid) {
        // Close OTP dialog
        setShowOtpDialog(false);
        
        // Generate a simple booking reference
        const bookingReference = `BK${Date.now().toString().slice(-6)}`;
        
        // Store booking details for confirmation dialog
        setBookingDetails({ ...formValues, bookingReference });
        
        // Send confirmation emails and SMS
        await sendBookingConfirmations({
          ...formValues,
          bookingReference,
        }, bookingReference);
        
        // Show confirmation dialog
        setShowConfirmation(true);
        
        // Show success toast
        toast({
          title: "Booking Successful!",
          description: "Check your email and phone for booking details.",
        });
        
        // Reset the form
        form.reset();
      } else {
        toast({
          title: "Verification Failed",
          description: "The code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Verification Error",
        description: "There was a problem verifying your code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (formValues) {
      await resendOtp(formValues.phone);
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your phone.",
      });
    }
  };

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

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={(open) => !isSubmitting && setShowOtpDialog(open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-3">
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Phone Verification
            </DialogTitle>
            <DialogDescription className="text-center">
              We've sent a verification code to {formValues?.phone}.<br />
              Enter the code below to verify your phone number.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 space-y-6">
            <OtpInput 
              onComplete={handleOtpComplete} 
              isDisabled={isVerifying}
            />
            
            {otpError && (
              <p className="text-destructive text-sm text-center">{otpError}</p>
            )}
            
            <div className="flex justify-center items-center text-sm">
              {timeLeft > 0 ? (
                <p className="text-muted-foreground">Resend code in {timeLeft}s</p>
              ) : (
                <Button 
                  variant="link" 
                  onClick={handleResendOtp} 
                  disabled={isVerifying}
                  className="text-primary p-0"
                >
                  Resend verification code
                </Button>
              )}
            </div>
            
            <Button 
              onClick={handleOtpVerification} 
              disabled={isVerifying || otpValue.length !== 6} 
              className="w-full animate-fade-in"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Complete Booking"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Dialog */}
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
