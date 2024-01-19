import React, { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

interface AuthContextProps {
    auth: {
        user?: string;
        pwd?: string;
        roles?: string[];
        accessToken?: string;
    };
    setAuth: Dispatch<SetStateAction<{
        user?: string;
        pwd?: string;
        roles?: string[];
        accessToken?: string;
    }>>;
    // isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps>({
    auth: {},
    setAuth: () => {},
    // isAuthenticated: () => false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState({});

    // @TODO: DOESN"T LOOK OK, better to use state
    // const isAuthenticated = () => {
    //     // Add your authentication logic here, e.g., check if accessToken exists
    //     return Boolean(auth.accessToken);
    // };
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
