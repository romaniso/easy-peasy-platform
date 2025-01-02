import { useContext } from "react";
import authContext from "../context/AuthContext";

export const useAuth = () => {
  return useContext(authContext);
};
