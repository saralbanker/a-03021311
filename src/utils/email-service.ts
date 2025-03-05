
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
 * Send an email to the recipient
 * @param data Email data including to, subject, and body
 * @returns Promise that resolves when email is sent
 */
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // In this demo, we'll log the email content to console
    console.log('Sending email to:', data.to);
    console.log('Subject:', data.subject);
    console.log('Body:', data.body);
    
    // In a real implementation, you would connect to an email API service like SendGrid, Mailgun, etc.
    // Example (commented out as we don't have actual credentials):
    /*
    const response = await fetch('https://api.emailservice.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        to: data.to,
        subject: data.subject,
        html: data.body
      })
    });
    
    return response.ok;
    */
    
    // For demo purposes, always return true
    // In production, you would check the response from the email service
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
  // Calculate total price
  const roomTypeDisplay = {
    standard: 'Standard Room',
    deluxe: 'Deluxe Room',
    suite: 'Luxury Suite'
  };
  
  const roomDisplay = bookingData.roomType in roomTypeDisplay 
    ? roomTypeDisplay[bookingData.roomType as keyof typeof roomTypeDisplay]
    : bookingData.roomType;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; }
        .header { background-color: #1b5e20; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 8px; border-bottom: 1px solid #ddd; }
        .highlight { font-weight: bold; color: #1b5e20; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Dandeli Adventures - Booking Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${bookingData.name},</p>
          <p>Thank you for booking with Dandeli Adventures. We're excited to host you!</p>
          
          <h3>Booking Details:</h3>
          <table class="info-table">
            <tr>
              <td><strong>Booking Reference:</strong></td>
              <td>${bookingData.paymentTransactionId || 'Processing'}</td>
            </tr>
            <tr>
              <td><strong>Check-in Date:</strong></td>
              <td>${bookingData.date ? bookingData.date.toLocaleDateString() : 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>Room Type:</strong></td>
              <td>${roomDisplay}</td>
            </tr>
            <tr>
              <td><strong>Guests:</strong></td>
              <td>${bookingData.adults} Adult(s), ${bookingData.children} Child(ren)</td>
            </tr>
            <tr>
              <td><strong>Payment Method:</strong></td>
              <td>${bookingData.paymentMethod === 'creditCard' ? 'Credit/Debit Card' : 
                  bookingData.paymentMethod === 'upi' ? 'UPI Payment' : 'Bank Transfer'}</td>
            </tr>
          </table>
          
          <h3>Guest Information:</h3>
          <table class="info-table">
            <tr>
              <td><strong>Name:</strong></td>
              <td>${bookingData.name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${bookingData.email}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>${bookingData.phone}</td>
            </tr>
          </table>
          
          <p class="highlight" style="margin-top: 30px;">Important Information:</p>
          <ul>
            <li>Check-in time: 2:00 PM</li>
            <li>Check-out time: 11:00 AM</li>
            <li>Please bring a valid ID for check-in</li>
            <li>Our staff will be available 24/7 to assist you</li>
          </ul>
          
          <p>If you have any questions or need to modify your booking, please contact us at:</p>
          <p>📞 +91 9876543210<br>📧 bookings@dandeliadventures.com</p>
          
          <p>We look forward to providing you with an unforgettable experience!</p>
          
          <p>Warm regards,<br>The Dandeli Adventures Team</p>
        </div>
        <div class="footer">
          <p>© 2023 Dandeli Adventures. All rights reserved.</p>
          <p>Kali River Front, Dandeli, Karnataka 581325, India</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send booking confirmation to both customer and admin
 * @param bookingData Booking form data
 * @param transactionId Payment transaction ID
 * @returns Promise that resolves when emails are sent
 */
export const sendBookingConfirmations = async (bookingData: any, transactionId: string): Promise<boolean> => {
  try {
    const bookingWithTransaction = {
      ...bookingData,
      paymentTransactionId: transactionId
    };
    
    // Format email content
    const emailContent = formatBookingEmail(bookingWithTransaction);
    
    // Send to admin (always send to Stanley)
    await sendEmail({
      to: "stanleyyesu@gmail.com",
      subject: `New Booking: ${bookingData.name} - ${transactionId}`,
      body: emailContent
    });
    
    // Send to customer
    await sendEmail({
      to: bookingData.email,
      subject: "Your Booking Confirmation - Dandeli Adventures",
      body: emailContent
    });
    
    return true;
  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    return false;
  }
};
