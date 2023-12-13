import { useState } from "react";

function useLoginRegister() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const toggleShowPassword = ():void => {
        setShowPassword(!showPassword);
    };
    const handleUserName = (value: string): void => {
        setUserName(value);
    };
    const handleUserPassword = (value: string): void => {
        setUserPassword(value);
    };
    const handleRememberMe = (): void => {
        setRememberMe(!rememberMe);
    };

    return {
        showPassword,
        userName,
        userPassword,
        rememberMe,
        toggleShowPassword,
        handleUserName,
        handleUserPassword,
        handleRememberMe,
    };
}

export default useLoginRegister;