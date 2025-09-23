import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import database from "./config/database.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
database();

// Routes
app.use("/api", enquiryRoutes);
app.use("/api", whatsappRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
