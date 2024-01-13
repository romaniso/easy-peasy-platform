import {useContext} from "react";
import authContext from "../context/AuthContext";

const useAuth = () => {
    return useContext(authContext);
}

export default useAuth;