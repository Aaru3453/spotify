import express from "express";
import { loginUser, logoutUser, myProfile, registerUser, saveToPlaylist } 
from "../controllers/userControllers.js";
import { Authen } from "../middlewares/Authen.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", Authen, myProfile);
router.get("/logout", Authen, logoutUser);
router.post("/song/:id", Authen, saveToPlaylist);

export default router;