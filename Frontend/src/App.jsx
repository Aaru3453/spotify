import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";
import Album from "./pages/Album";

function App() {
  const {loading, user, Authen} = UserData();
  return (
  <>
    {loading ? (
      <Loading/>
    ): (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Authen?<Home/>:<Login/>}/>

        <Route path="/playlist" element={Authen?<PlayList user={user} />:<Login/>}/>

        <Route path="/album/:id" element={Authen?<Album user={user} />:<Login/>}/>

        <Route path="/admin" element={Authen?<Admin/>:<Login/>}/>

        <Route path="/login" element={Authen?<Home/>:<Login/>}/>

        <Route path="/register" element={Authen?<Home/>:<Register/>}/>

      </Routes>
    </BrowserRouter>
  )}
  
  </>
  );
};

export default App;


