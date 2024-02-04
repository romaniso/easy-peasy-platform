import {useContext} from "react";
import userContext from "../context/UserContext";

const useUser = () => {
    return useContext(userContext);
}

export default useUser;