import React, {useState, createContext, ReactNode, Dispatch, SetStateAction} from "react";

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
    persist: boolean,
    setPersist: Dispatch<SetStateAction< boolean>>

    // isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps>({
    auth: {},
    setAuth: () => {},
    persist: false,
    setPersist: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse((localStorage.getItem('persist') as string)) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
