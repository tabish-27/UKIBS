import nodemailer from 'nodemailer';

// Create transporter for email service
const createTransporter = () => {
  console.log('Creating email transporter with user:', process.env.EMAIL_USER);
  
  // For Gmail with App Password
  if (process.env.EMAIL_USER && process.env.EMAIL_USER.includes('gmail.com')) {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This MUST be an App Password, not regular password
      },
    });
  }
  
  // For other email providers or custom SMTP
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send enquiry notification email
export const sendEnquiryEmail = async (enquiryData) => {
  try {
    console.log('Attempting to send email for enquiry:', enquiryData.name);
    
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email configuration missing in environment variables');
      return { success: false, error: 'Email configuration not found' };
    }

    const transporter = createTransporter();

    // Email template for enquiry notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Admin email to receive enquiries
      subject: `New Enquiry from ${enquiryData.name} - UK International`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #e91e63; text-align: center;">New Enquiry Received</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Enquiry Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${enquiryData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0; color: #333;">${enquiryData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">City:</td>
                <td style="padding: 8px 0; color: #333;">${enquiryData.city || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Course Interest:</td>
                <td style="padding: 8px 0; color: #333;">${enquiryData.course || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Source:</td>
                <td style="padding: 8px 0; color: #333;">${enquiryData.source || 'Unknown'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Enquiry Date:</td>
                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #e91e63; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px;">
              <strong>Action Required:</strong> Please follow up with this enquiry as soon as possible.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            <p>This email was automatically generated from UK International website enquiry form.</p>
          </div>
        </div>
      `,
      text: `
        New Enquiry Received - UK International
        
        Enquiry Details:
        Name: ${enquiryData.name}
        Phone: ${enquiryData.phone}
        City: ${enquiryData.city || 'Not provided'}
        Course Interest: ${enquiryData.course || 'Not specified'}
        Source: ${enquiryData.source || 'Unknown'}
        Enquiry Date: ${new Date().toLocaleString()}
        
        Please follow up with this enquiry as soon as possible.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Enquiry email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Error sending enquiry email:', error);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to the enquirer (optional)
export const sendConfirmationEmail = async (enquiryData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: enquiryData.email, // If you collect email from enquirer
      subject: 'Thank you for your enquiry - UK International',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #e91e63; text-align: center;">Thank You for Your Enquiry!</h2>
          
          <p style="font-size: 16px; color: #333;">Dear ${enquiryData.name},</p>
          
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Thank you for your interest in UK International. We have received your enquiry and our team will get back to you within 24 hours.
          </p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333;">Your Enquiry Details:</h3>
            <p><strong>Course Interest:</strong> ${enquiryData.course || 'General Enquiry'}</p>
            <p><strong>City:</strong> ${enquiryData.city || 'Not specified'}</p>
          </div>
          
          <p style="font-size: 14px; color: #555;">
            For any immediate assistance, please feel free to call us at your convenience.
          </p>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="color: #e91e63; font-weight: bold;">UK International Team</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
};