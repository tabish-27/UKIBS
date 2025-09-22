import axios from 'axios';

// WhatsApp service using Interakt API
export const sendWhatsAppWelcomeMessage = async (phoneNumber, name) => {
  try {
    console.log(`Attempting to send WhatsApp welcome message to ${phoneNumber} for ${name}`);

    // Check if WhatsApp configuration is available
    if (!process.env.INTERAKT_API_KEY) {
      console.warn('WhatsApp configuration missing in environment variables');
      return { success: false, error: 'WhatsApp service not configured' };
    }

    // Sanitize the phone number to be 10 digits without the country code
    const sanitizedPhoneNumber = phoneNumber.replace(/^\+?91/, '');

    if (sanitizedPhoneNumber.length !== 10 || !/^\d+$/.test(sanitizedPhoneNumber)) {
      console.error("Invalid phone number format after sanitization:", sanitizedPhoneNumber);
      return { success: false, error: 'Invalid phone number format' };
    }

    const payload = {
      phoneNumber: `+91${sanitizedPhoneNumber}`,
      templateId: process.env.TEMPLATE_ID || "uk_international_welcome_",
      callbackData: "enquiry_form_submission",
      bodyParams: [name]
    };

    console.log("Making Interakt API call with payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post("https://api.interakt.ai/v1/public/message/", payload, {
      headers: {
        "Authorization": `Bearer ${process.env.INTERAKT_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    console.log("WhatsApp welcome message sent successfully:", response.data);
    return { success: true, data: response.data };

  } catch (error) {
    console.error('Error sending WhatsApp welcome message:', error);
    
    if (error.response) {
      console.error("Interakt API Error Status:", error.response.status);
      console.error("Interakt API Error Data:", error.response.data);
      return { 
        success: false, 
        error: `Interakt API error: ${error.response.data.message || error.response.statusText}` 
      };
    } else if (error.request) {
      console.error("No response received from Interakt API");
      return { success: false, error: 'No response received from WhatsApp service' };
    } else {
      return { success: false, error: error.message };
    }
  }
};