
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { sendBookingConfirmations } from "@/utils/email-service";
import { BookingFormData, FormSchema } from "./booking/types";
import { PersonalInfoFields } from "./booking/PersonalInfoFields";
import { GuestCountFields } from "./booking/GuestCountFields";
import { DateFields } from "./booking/DateFields";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from "lucide-react";

interface BookingFormProps {
  onSubmit: (values: BookingFormData) => void;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm<BookingFormData>({
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

  const handleFormSubmit = async (values: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const bookingReference = `BK${Date.now().toString().slice(-6)}`;
      
      // Send confirmation emails
      await sendBookingConfirmations({
        ...values,
        bookingReference,
        recipientEmail: "dandeliadventure.info@gmail.com" // Add admin email
      }, bookingReference);

      setShowConfirmation(true);
      form.reset();
      onSubmit(values);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <PersonalInfoFields form={form} />
          <GuestCountFields form={form} />
          <DateFields form={form} />

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
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="h-10 w-10 text-green-600" />
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold mb-4"
              >
                Booking Confirmed!
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                Thank you for booking with us. We'll send you a confirmation email shortly.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button onClick={() => setShowConfirmation(false)}>
                  Close
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
