import { useContext } from "react";
import userContext from "../context/UserContext";

export const useUser = () => {
  return useContext(userContext);
};
