import { getConnectionStatus } from "../db/database.js";
import User from "../models/UserSchema.js";
import { sendEnquiryEmail } from "../utils/emailService.js";
import { sendWhatsAppWelcomeMessage } from "../utils/whatsappService.js";

// POST /enquiry → form submit
const submitEnquiry = async (req, res, next) => {
  try {
    const { name, phone, city, course, source } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and phone",
      });
    }

    if (!city?.trim() && !course?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide either city or course",
      });
    }

    // Check database connection status
    if (!getConnectionStatus()) {
      console.log("Database not connected, skipping enquiry storage but continuing with process");
      
      // Still send email even if database is not connected
      const emailResult = await sendEnquiryEmail({
        name,
        phone,
        city,
        course,
        source: source || "unknown"
      });

      // Send WhatsApp welcome message
      const whatsappResult = await sendWhatsAppWelcomeMessage(phone, name);

      // Still return success to continue with WhatsApp flow
      return res.status(201).json({
        success: true,
        message: "Enquiry received successfully (database temporarily unavailable)",
        data: { name, phone, city, course, source: source || "unknown" },
        emailSent: emailResult.success,
        whatsappSent: whatsappResult.success
      });
    }

    // Save enquiry to DB
    const enquiry = await User.create({
      name,
      phone,
      city,
      course,
      source: source || "unknown",
    });

    // Send email notification
    const emailResult = await sendEnquiryEmail({
      name,
      phone,
      city,
      course,
      source: source || "unknown"
    });

    if (!emailResult.success) {
      console.warn('Email notification failed:', emailResult.error);
    }

    // Send WhatsApp welcome message
    const whatsappResult = await sendWhatsAppWelcomeMessage(phone, name);

    if (!whatsappResult.success) {
      console.warn('WhatsApp welcome message failed:', whatsappResult.error);
    }

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
      emailSent: emailResult.success,
      whatsappSent: whatsappResult.success
    });
  } catch (error) {
    console.error("Error in submitEnquiry:", error.message);
    
    // If it's a timeout or connection error, still allow the process to continue
    if (error.message.includes('buffering timed out') || error.message.includes('connection')) {
      console.log("Database operation failed, but continuing process");
      
      // Try to send email even if database failed
      const emailResult = await sendEnquiryEmail({
        name: req.body.name,
        phone: req.body.phone,
        city: req.body.city,
        course: req.body.course,
        source: req.body.source || "unknown"
      });

      // Send WhatsApp welcome message
      const whatsappResult = await sendWhatsAppWelcomeMessage(req.body.phone, req.body.name);
      
      return res.status(201).json({
        success: true,
        message: "Enquiry received successfully (database temporarily unavailable)",
        data: { name: req.body.name, phone: req.body.phone, city: req.body.city, course: req.body.course },
        emailSent: emailResult.success,
        whatsappSent: whatsappResult.success
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};

// GET /enquiries → fetch all users for admin panel
export const getEnquiries = async (req, res) => {
  try {
    // Check database connection status
    if (!getConnectionStatus()) {
      return res.status(503).json({ 
        success: false, 
        message: "Database temporarily unavailable" 
      });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error in getEnquiries:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default submitEnquiry;
