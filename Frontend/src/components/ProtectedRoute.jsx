import { Navigate } from "react-router-dom";
import { UserData } from "../context/User";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { Authen, loading } = UserData();

  if (loading) {
    return <Loading />; // jab tak user ki auth check ho rahi hai
  }

  return Authen ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
