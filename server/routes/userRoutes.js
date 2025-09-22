import express from 'express';
import submitEnquiry, { getEnquiries } from "../controllers/usrControllers.js";

const app = express.Router();

// Enquiry form submit
app.post('/enquiry', submitEnquiry);

// Admin fetch
app.get('/enquiries', getEnquiries);

export default app;
