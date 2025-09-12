import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "./api"; // ✅ centralized axios instance (api.js se import karna hai)

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [song, setSong] = useState({});
  const [selectedSong, setSelectedSong] = useState(null);
  const [songLoading, setSongLoading] = useState(true);

  // ---------------- FETCH SONGS ----------------
  async function fetchSongs() {
    try {
      const { data } = await api.get("/song/all");
      setSongs(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching songs");
    }
  }

  // ---------------- FETCH ALBUMS ----------------
  async function fetchAlbums() {
    try {
      const { data } = await api.get("/album/all");
      setAlbums(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching albums");
    }
  }

  // ---------------- FETCH SINGLE SONG ----------------
  async function fetchSingleSong() {
    if (!selectedSong) return;
    setSongLoading(true);
    try {
      const { data } = await api.get(`/song/single/${selectedSong}`);
      setSong(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching song");
    } finally {
      setSongLoading(false);
    }
  }

  // ---------------- ADD ALBUM ----------------
  async function addAlbum(formData) {
    try {
      const { data } = await api.post("/album/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      fetchAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  // ---------------- ADD SONG ----------------
  async function addSong(formData) {
    try {
      const { data } = await api.post("/song/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  // ---------------- ADD ALBUM THUMBNAIL ----------------
  async function addThumbnail(formData, id) {
    try {
      const { data } = await api.post(`/album/thumbnail/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      fetchAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  // Auto fetch songs + albums on mount
  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  // Auto fetch single song when selectedSong changes
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  return (
    <SongContext.Provider
      value={{
        songs,
        albums,
        song,
        songLoading,
        selectedSong,
        setSelectedSong,
        fetchSongs,
        fetchAlbums,
        addAlbum,
        addSong,
        addThumbnail,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);

