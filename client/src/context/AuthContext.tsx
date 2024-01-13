import React, {createContext, ReactNode, useState} from "react";

const AuthContext = createContext({});


interface AuthProviderProviderProps {
    children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProviderProps> = ({children}) => {
    const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;