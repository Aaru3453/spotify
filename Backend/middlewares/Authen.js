import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const Authen = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // ✅ agar cookie se token na mile to Authorization header check karo
    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(403).json({ message: "Please Login" });
    }

    const decodedData = jwt.verify(token, process.env.Jwt_secret);
    if (!decodedData) {
      return res.status(403).json({ message: "Token Expired" });
    }

    req.user = await User.findById(decodedData.id);
    if (!req.user) {
      return res.status(403).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(500).json({ message: "Please Login" });
  }
};

