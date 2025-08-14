import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_BASE } from "./config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [Authen, setAuthen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function registerUser(
    name,
    email,
    password,
    navigate,
    fetchSongs,
    fetchAlbums
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/user/register`, {
        name,
        email,
        password,
      });
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

  async function loginUser(email, password, navigate, fetchSongs, fetchAlbums) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/user/login`, {
        email,
        password,
      });
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
      setAuthen(false);
      setLoading(false);
    }
  }

  async function logoutUser() {
    try {
      await axios.get(`${API_BASE}/api/user/logout`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  async function addToPlaylist(id) {
    try {
      const { data } = await axios.post(`${API_BASE}/api/user/song/${id}`);
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
