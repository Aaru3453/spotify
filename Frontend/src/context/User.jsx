import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "./api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Authen, setAuthen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function registerUser(name, email, password, navigate, fetchSongs, fetchAlbums) {
    setBtnLoading(true);
    try {
      const { data } = await api.post("/user/register", { name, email, password });
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
      const { data } = await api.post("/user/login", { email, password });
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
      const { data } = await api.get("/user/me");
      setUser(data || null);
      setAuthen(!!data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching user:", error);
      setUser(null);
      setAuthen(false);
      setLoading(false);
    }
  }

  async function logoutUser() {
    try {
      await api.get("/user/logout");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  async function addToPlaylist(id) {
    try {
      const { data } = await api.post(`/user/song/${id}`, {});
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
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);


