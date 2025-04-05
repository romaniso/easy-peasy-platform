import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { useAuth } from "./useAuth";
import { setUser } from "../store/store";
import { User } from "../interfaces/user";

interface RefreshTokenResponse {
  user: User;
  accessToken: string;
}

export const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.get<RefreshTokenResponse>("/refresh", {
      withCredentials: true,
    });
    const { user, accessToken } = response.data;
    setAuth((prev) => {
      return {
        ...prev,
        user: user.username,
        roles: user.roles,
        accessToken,
      };
    });

    dispatch(setUser({ ...user, accessToken }));
    return response.data.accessToken;
  };
  return refresh;
};
