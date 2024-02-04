import React, {createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import {User} from "../interfaces/user";
interface UserContextProps {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}
const UserContext = createContext<UserContextProps>({
    user: {},
    setUser: () => {},
});
export const UserProvider: React.FC<{children: ReactElement}> = ({children}) => {
    const [user, setUser] = useState<User>({});

    useEffect(() => {
        console.log("User context: ", user);
    }, [JSON.stringify(user)]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;

