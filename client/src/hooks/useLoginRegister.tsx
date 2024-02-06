import { useState, useRef } from "react";

function useLoginRegister() {
    const [userName, setUserName] = useState<string>("");
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

    return {
        userName,
        setUserName,
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
    };
}

export default useLoginRegister;