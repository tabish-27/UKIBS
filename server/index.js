import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/database.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import whatsappRoutes from "./routes/whatsapp.js";
import mongoose from "mongoose";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/whatsapp", whatsappRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hi, Welcome to the server!");
});

// DB test route
app.get("/api/test-db", (req, res) => {
  const status = mongoose.connection.readyState; 
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  res.json({ connected: status === 1, status });
});

// Connect DB then run server
connectDB()
  .then(() => {
    console.log("✅ Database connection attempt completed");
  })
  .catch((error) => {
    console.error("❌ Failed to connect DB:", error.message);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  });
