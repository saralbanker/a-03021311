
/**
 * Email Service Utility
 * This module contains functions to send emails from the application
 */

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

/**
 * Send an email using the EmailJS service
 * @param data Email data including to, subject, and body
 * @returns Promise that resolves when email is sent
 */
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // In a production environment, this would connect to a real email service API
    // For demo purposes, we're just logging the data and simulating a successful send
    console.log('Sending email to:', data.to);
    console.log('Subject:', data.subject);
    console.log('Body:', data.body);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would normally make an API call to your email service
    // For example, using EmailJS or a backend API endpoint
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Format booking details into HTML email content
 * @param bookingData Booking form data
 * @returns Formatted HTML string
 */
export const formatBookingEmail = (bookingData: any): string => {
  return `
    <h2>New Booking Request</h2>
    <p>A new booking request has been submitted with the following details:</p>
    
    <h3>Guest Information:</h3>
    <ul>
      <li><strong>Name:</strong> ${bookingData.name}</li>
      <li><strong>Email:</strong> ${bookingData.email}</li>
      <li><strong>Phone:</strong> ${bookingData.phone}</li>
    </ul>
    
    <h3>Booking Details:</h3>
    <ul>
      <li><strong>Check-in Date:</strong> ${bookingData.date.toLocaleDateString()}</li>
      <li><strong>Room Type:</strong> ${bookingData.roomType}</li>
      <li><strong>Adults:</strong> ${bookingData.adults}</li>
      <li><strong>Children:</strong> ${bookingData.children}</li>
      <li><strong>Payment Method:</strong> ${bookingData.paymentMethod}</li>
    </ul>
    
    <p>Please contact the guest to confirm their booking.</p>
  `;
};
