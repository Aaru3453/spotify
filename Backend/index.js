import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors";

dotenv.config();

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const app = express();

// ✅ Dynamic CORS config with logging
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    // Allow localhost (dev) and any *.onrender.com domain
    const allowed =
      origin.includes("localhost") ||
      /\.onrender\.com$/.test(new URL(origin).hostname);

    if (allowed) {
      callback(null, true);
    } else {
      console.warn(`🚫 CORS Blocked Request from Origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Environment port
const port = process.env.PORT || 5000;

// Import routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  connectDb();
});




