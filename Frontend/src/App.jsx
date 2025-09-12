import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";
import Album from "./pages/Album";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import

function App() {
  const { loading, user, Authen } = UserData();

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={Authen ? <Home /> : <Login />} />
        <Route path="/register" element={Authen ? <Home /> : <Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <ProtectedRoute>
              <PlayList user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/album/:id"
          element={
            <ProtectedRoute>
              <Album user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

