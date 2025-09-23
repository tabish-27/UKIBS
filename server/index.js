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

// -------------------- MIDDLEWARES --------------------
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// -------------------- API ROUTES --------------------
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/whatsapp", whatsappRoutes);

// Optional: Test route for backend only
app.get("/api/test-server", (req, res) => {
  res.send("✅ Backend server is running!");
});

// DB test route
app.get("/api/test-db", (req, res) => {
  const status = mongoose.connection.readyState; // 0=disconnected,1=connected
  res.json({ connected: status === 1, status });
});

// -------------------- REACT FRONTEND SERVE --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure this points to your Vite build folder (dist)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// -------------------- CONNECT TO DB & START SERVER --------------------
connectDB()
  .then(() => {
    console.log("✅ Database connection attempt completed");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect DB:", error.message);
  });
