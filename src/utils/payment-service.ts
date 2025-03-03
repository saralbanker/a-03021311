
/**
 * Payment Service Utility
 * Handles payment processing functionality
 */

interface PaymentDetails {
  amount: number;
  currency: string;
  paymentMethod: string;
  description: string;
  metadata?: Record<string, any>;
}

/**
 * Process a payment
 * @param details Payment details including amount, currency, and method
 * @returns Promise that resolves with payment result
 */
export const processPayment = async (details: PaymentDetails): Promise<{success: boolean; transactionId?: string; error?: string}> => {
  try {
    console.log('Processing payment:', details);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, this would connect to Stripe, Razorpay, or another payment gateway
    // For demo purposes, we're simulating a successful payment
    
    // Generate a random transaction ID
    const transactionId = 'TXN' + Math.random().toString(36).substring(2, 15).toUpperCase();
    
    return {
      success: true,
      transactionId
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: 'Payment processing failed. Please try again.'
    };
  }
};

/**
 * Calculate booking price based on room type and guests
 * @param roomType The type of room booked
 * @param adults Number of adults
 * @param children Number of children
 * @returns Calculated price
 */
export const calculateBookingPrice = (roomType: string, adults: number, children: number): number => {
  // Base prices per room type
  const basePrices = {
    standard: 100,
    deluxe: 150,
    suite: 250
  };
  
  // Get the base price for the room type
  const basePrice = roomType in basePrices 
    ? basePrices[roomType as keyof typeof basePrices] 
    : 100;
  
  // Add per person costs
  const adultCost = adults * 20;
  const childrenCost = children * 10;
  
  return basePrice + adultCost + childrenCost;
};
