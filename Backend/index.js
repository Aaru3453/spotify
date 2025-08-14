import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";
import cors from "cors";

dotenv.config();

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const app = express();

// ✅ Allowed origins list
const allowedOrigins = [
  "http://localhost:5173",                 // Local development
  "https://spotify-1-naze.onrender.com"    // Render frontend
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
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

// __dirname in ES module
const __dirname = path.resolve();

// Serve static frontend files
app.use(express.static(path.join(__dirname, "..", "Frontend", "dist")));

// Fallback route for SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Frontend", "dist", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});



