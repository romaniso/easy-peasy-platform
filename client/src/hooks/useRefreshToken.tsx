import axios from '../api/axios';
import useAuth from "./useAuth";
import useUser from "./useUser";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const {setUser} = useUser();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        const {user, username, accessToken, roles} = response.data;

        setAuth(prev => {
            return {
                ...prev,
                user: username,
                roles,
                accessToken
            };
        });

        console.log("REFRESH: ",user);

        //@TODO: set User Context
        setUser(
            prev => {
                return {
                    ...prev,
                    username,
                    ...user,
                }
            }
        )

        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken;