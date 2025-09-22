import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const INTERAKT_API_KEY = process.env.INTERAKT_API_KEY;
const TEMPLATE_ID = process.env.TEMPLATE_ID || "uk_international_welcome_"; // Default template ID

const sendMessage = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;

    console.log("-----------------------------------------");
    console.log("Received request body:", req.body);
    console.log("Interakt API Key:", INTERAKT_API_KEY ? "Loaded successfully" : "FAILED to load");
    console.log("Template ID:", TEMPLATE_ID);
    console.log("-----------------------------------------");

    if (!phoneNumber || !name) {
        console.error("Missing required fields: phoneNumber and name.");
        return res.status(400).json({ success: false, message: 'Missing required fields: phoneNumber and name.' });
    }

    if (!INTERAKT_API_KEY) {
        console.error("Interakt API Key is not configured.");
        return res.status(500).json({ success: false, message: 'WhatsApp service not configured properly.' });
    }

    // Sanitize the phone number to be 10 digits without the country code
    const sanitizedPhoneNumber = phoneNumber.replace(/^\+?91/, '');

    if (sanitizedPhoneNumber.length !== 10 || !/^\d+$/.test(sanitizedPhoneNumber)) {
        console.error("Invalid phone number format after sanitization:", sanitizedPhoneNumber);
        return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
    }

const payload = {
  phoneNumber: `+91${sanitizedPhoneNumber}`,
  templateId: TEMPLATE_ID,
  callbackData: "enquiry_form_submission",
  bodyParams: [name]
};

    
    console.log("Making Interakt API call with payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post("https://api.interakt.ai/v1/public/message/", payload, {
      headers: {
        "Authorization": `Bearer ${INTERAKT_API_KEY}`,
        "Content-Type": "application/json"
      }
    });


    console.log("Interakt API responded successfully:", response.status, response.data);
    res.status(200).json({ success: true, message: 'WhatsApp message sent successfully!' });
  } catch (error) {
    console.error('An error occurred during the Interakt API call.');
    
    if (error.response) {
      console.error("Interakt API Error Status:", error.response.status);
      console.error("Interakt API Error Data:", error.response.data);
      res.status(error.response.status).json({ 
        success: false, 
        message: 'Interakt API error.', 
        error: error.response.data 
      });
    } else if (error.request) {
      console.error("Interakt API Error: No response received.", error.request);
      res.status(500).json({ success: false, message: 'No response received from Interakt API.' });
    } else {
      console.error("Interakt API Error:", error.message);
      res.status(500).json({ success: false, message: 'Failed to send WhatsApp message.', error: error.message });
    }
  }
};

export { sendMessage };

