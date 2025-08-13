import express from "express";
import { Authen } from "../middlewares/Authen.js";
import uploadFile from "../middlewares/multer.js";
import { addSong, addThumbnail, 
    createAlbum, deleteSong, getAllAlbums, getAllSongs, 
    getAllSongsByAlbum, 
    getSingleSong} 
    from "../controllers/songControllers.js";

const router = express.Router();

router.post("/album/new", Authen, uploadFile, createAlbum);
router.get("/album/all", Authen, getAllAlbums);
router.post("/new", Authen, uploadFile, addSong);
router.post("/:id", Authen, uploadFile, addThumbnail);
router.get("/single/:id", Authen, getSingleSong);
router.delete("/:id", Authen, deleteSong);
router.get("/all", Authen, getAllSongs);
router.get("/album/:id", Authen, getAllSongsByAlbum);

export default router;