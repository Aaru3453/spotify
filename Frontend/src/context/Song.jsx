import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "./api";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState({});
  const [albums, setAlbums] = useState([]);
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState({});

  async function fetchSongs() {
    try {
      const { data } = await api.get("/song/all");
      setSongs(data || []);
      if (data?.length > 0) setSelectedSong(data[0]._id);
      setIsPlaying(false);
      setSongLoading(false);
    } catch (error) {
      console.log("Error fetching songs:", error);
      setSongLoading(false);
    }
  }

  async function fetchSingleSong() {
    if (!selectedSong) return;
    try {
      const { data } = await api.get(`/song/single/${selectedSong}`);
      setSong(data || {});
    } catch (error) {
      console.log("Error fetching single song:", error);
      setSong({});
    }
  }

  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await api.post("/song/album/new", formData);
      toast.success(data.message);
      setLoading(false);
      fetchAlbums();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
      setLoading(false);
    }
  }

  async function addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum) {
    setLoading(true);
    try {
      const { data } = await api.post("/song/new", formData);
      toast.success(data.message);
      setLoading(false);
      fetchSongs();
      setTitle("");
      setDescription("");
      setFile(null);
      setSinger("");
      setAlbum("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
      setLoading(false);
    }
  }

  async function addThumbnail(id, formData, setFile) {
    setLoading(true);
    try {
      const { data } = await api.post(`/song/${id}`, formData);
      toast.success(data.message);
      setLoading(false);
      fetchSongs();
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
      setLoading(false);
    }
  }

  async function fetchAlbums() {
    try {
      const { data } = await api.get("/song/album/all");
      setAlbums(data || []);
    } catch (error) {
      console.log("Error fetching albums:", error);
      setAlbums([]);
    }
  }

  async function fetchAlbumSong(id) {
    try {
      const { data } = await api.get(`/song/album/${id}`);
      setAlbumSong(data.songs || []);
      setAlbumData(data.album || {});
    } catch (error) {
      console.log("Error fetching album songs:", error);
      setAlbumSong([]);
      setAlbumData({});
    }
  }

  async function deleteSong(id) {
    try {
      const { data } = await api.delete(`/song/${id}`);
      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  const [index, setIndex] = useState(0);
  function nextMusic() {
    if (!songs.length) return;
    const nextIndex = index === songs.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);
    setSelectedSong(songs[nextIndex]?._id || null);
  }

  function prevMusic() {
    if (!songs.length || index === 0) return;
    const prevIndex = index - 1;
    setIndex(prevIndex);
    setSelectedSong(songs[prevIndex]?._id || null);
  }

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        addAlbum,
        loading,
        songLoading,
        albums,
        addSong,
        addThumbnail,
        deleteSong,
        fetchSingleSong,
        song,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        selectedSong,
        nextMusic,
        prevMusic,
        fetchAlbumSong,
        albumSong,
        albumData,
        fetchSongs,
        fetchAlbums,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);



