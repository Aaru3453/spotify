import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE } from "./config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});   // ✅ object instead of array
  const [Authen, setAuthen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------- REGISTER ----------------
  async function registerUser(name, email, password, navigate, fetchSongs, fetchAlbums) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/api/user/register`,
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(data.message);
      setUser(data.user);
      setAuthen(true);
      setBtnLoading(false);
      navigate("/");
      fetchSongs();
      fetchAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
      setBtnLoading(false);
    }
  }

  // ---------------- LOGIN ----------------
  async function loginUser(email, password, navigate, fetchSongs, fetchAlbums) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success(data.message);
      setUser(data.user);
      setAuthen(true);
      setBtnLoading(false);
      navigate("/");
      fetchSongs();
      fetchAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
      setBtnLoading(false);
    }
  }

  // ---------------- FETCH USER ----------------
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${API_BASE}/api/user/me`, {
        withCredentials: true,
      });
      setUser(data);
      setAuthen(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUser({});          // ✅ reset user
      setAuthen(false);
      setLoading(false);
    }
  }

  // ---------------- LOGOUT ----------------
  async function logoutUser() {
    try {
      await axios.get(`${API_BASE}/api/user/logout`, { withCredentials: true });
      setUser({});          // ✅ clear user
      setAuthen(false);     // ✅ clear auth
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  // ---------------- ADD TO PLAYLIST ----------------
  async function addToPlaylist(id) {
    try {
      const { data } = await axios.post(
        `${API_BASE}/api/user/song/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        user,
        Authen,
        btnLoading,
        loading,
        loginUser,
        logoutUser,
        addToPlaylist,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
