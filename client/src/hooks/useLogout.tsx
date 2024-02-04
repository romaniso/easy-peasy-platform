import axios from '../api/axios';
import useAuth from "./useAuth";
import useUser from "./useUser";

const useLogout = () => {
    const {setAuth} = useAuth();
    const {setUser} = useUser();

    const logout = async () => {
        setAuth({});
        setUser({});
        try {
            const response = await axios('/logout', {
                withCredentials: true,
            })
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;