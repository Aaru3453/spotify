import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors";

dotenv.config();

// ✅ Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// ✅ Allowed origins list
const allowedOrigins = [
  "http://localhost:5173",                 // Local development (Vite frontend)
  "https://spotify-1-naze.onrender.com"    // Deployed frontend
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow mobile apps, curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true   // ✅ cookies allow
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Environment port
const port = process.env.PORT || 5000;

// ✅ Import routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

// ✅ Use routes
app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  connectDb();
});