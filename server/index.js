// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import connectDB from "./db/database.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import whatsappRoutes from "./routes/whatsapp.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/whatsapp", whatsappRoutes);

// Test route
app.get("/*", (req, res) => {
  res.send("Hi, Welcome to the server!");
});

// DB test route
app.get("/api/test-db", (req, res) => {
  const status = mongoose.connection.readyState; 
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  res.json({ connected: status === 1, status });
});

// Serve React build (production)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Connect to MongoDB Atlas and start server
connectDB()
  .then(() => {
    console.log("✅ Database connection attempt completed");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect DB:", error.message);
  });
