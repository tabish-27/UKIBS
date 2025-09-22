import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in environment variables");
    }

    mongoose.set("bufferCommands", false);

    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    isConnected = true;
    console.log(`✅ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
      isConnected = false;
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
      isConnected = true;
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    isConnected = false;
    console.log("🚨 Continuing without database connection...");
  }
};

export const getConnectionStatus = () => isConnected;
export default connectDB;