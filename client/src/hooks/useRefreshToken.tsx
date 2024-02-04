import axios from '../api/axios';
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        console.log(response.data.user);

        setAuth(prev => {
            return {
                ...prev,
                user: response.data.user,
                roles: response.data.roles,
                accessToken: response.data.accessToken};
        });
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken;