/* eslint-disable react/prop-types */
import { decodeToken } from "@/helper/jwt-decode";
import { Logout_User } from "@/redux/slices/userCredentialSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ redirectRoute }) {
  const token = useSelector((state) => state.userCredentials.token);
  const dispatch = useDispatch();

  const isTokenValid = () => {
    if (!token) return false;
    try {
      const { exp } = decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) {
        dispatch(Logout_User());
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      dispatch(Logout_User());
      return false;
    }
  };

  const isAuthenticated = isTokenValid();

  return isAuthenticated ? <Outlet /> : <Navigate replace to={redirectRoute} />;
}
