import { useState, useRef } from "react";

function useLoginRegister() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [validName, setValidName] = useState<boolean>(false)
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [userPassword, setUserPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const userRef = useRef<HTMLInputElement>();
    const errRef = useRef<HTMLInputElement>();

    const toggleShowPassword = ():void => {
        setShowPassword(!showPassword);
    };
    const handleUserName = (value: string): void => {
        setUserName(value);
    };
    const handleValidUser = (): void => {
        setValidName(!validName);
    }
    const handleUserFocus = (): void => {
        setUserFocus(!userFocus);
    }
    const handleUserPassword = (value: string): void => {
        setUserPassword(value);
    };
    const handleRememberMe = (): void => {
        setRememberMe(!rememberMe);
    };

    return {
        showPassword,
        userName,
        validName,
        userFocus,
        userPassword,
        rememberMe,
        toggleShowPassword,
        handleUserName,
        handleValidUser,
        handleUserFocus,
        handleUserPassword,
        handleRememberMe,
        userRef,
        errRef,
    };
}

export default useLoginRegister;