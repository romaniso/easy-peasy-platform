import axios from "../api/axios";
import { useAuth } from "./useAuth";
import { useUser } from "./useUser";

export const useLogout = () => {
  const { setAuth } = useAuth();
  const { setUser } = useUser();

  const logout = async () => {
    setAuth({});
    setUser({});
    try {
      await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};
