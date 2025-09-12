import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://spotify-1-naze.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  connectDb();
});
