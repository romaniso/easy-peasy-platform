import { useState, useRef } from "react";

function useLoginRegister() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [user, setUser] = useState<string>("");
    const [validName, setValidName] = useState<boolean>(false)
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [pwd, setPwd] = useState<string>("");
    const [validPwd, setValidPwd] = useState<boolean>(false)
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>("");
    const [validMatch, setValidMatch] = useState<boolean>(false)
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState(false);

    const toggleShowPassword = ():void => {
        setShowPassword(!showPassword);
    };
    // const handleRememberMe = (): void => {
    //     setRememberMe(!rememberMe);
    // };

    return {
        showPassword,
        user,
        setUser,
        validName,
        setValidName,
        userFocus,
        setUserFocus,
        pwd,
        setPwd,
        validPwd,
        setValidPwd,
        pwdFocus,
        setPwdFocus,
        matchPwd,
        setMatchPwd,
        validMatch,
        setValidMatch,
        matchFocus,
        setMatchFocus,
        errMsg,
        setErrMsg,
        success,
        setSuccess,
        userRef,
        errRef,

        toggleShowPassword,
        // handleRememberMe,
    };
}

export default useLoginRegister;