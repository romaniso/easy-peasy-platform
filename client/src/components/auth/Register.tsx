import React, {useEffect, useRef, useState} from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import Panel from "../Panel";
import LoginImage from "../../assets/images/login-image.jpg";
import Input from "../Input";
import Password from "./Password";
import Button from "../Button";
import {CiLogin} from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";


// import axios from "axios";
// import {useLocation, useNavigate} from "react-router-dom";
// import Toast from "../Toast";
// import {ToastType} from "../../enums/toast";

interface SignupProps {
    onToggleForm(): void;
}
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register: React.FC<SignupProps> = ({ onToggleForm }) => {
    const [user, setUser] = useState<string>("");
    const [validName, setValidName] = useState<boolean>(false)
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const userRef = useRef();
    const errRef = useRef();

    const [pwd, setPwd] = useState<string>("");
    const [validPwd, setValidPwd] = useState<boolean>(false)
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>("");
    const [validMatch, setValidMatch] = useState<boolean>(false)
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidMatch(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
       setErrMsg('');
    }, [user, pwd, matchPwd])


        // const [errorMessage, setErrorMessage] = useState<string | null>(null);
        const {
            showPassword,
            toggleShowPassword,
            // handleUserName,
            // handleValidUser,
            // handleUserFocus,
            // handleUserPassword,
            // userName,
            // userPassword,
            // userRef,
            // errRef,
            // userFocus,
        } = useLoginRegister();
    //#oldcode
        // const navigate = useNavigate();
        // const location = useLocation();
        // const from = location.state?.from?.path || "/dashboard";
        // const handleFormSubmit = async (event: React.FormEvent) => {
        //     event.preventDefault();
        //     try {
        //         await axios.post('http://localhost:5000/auth/registration', {
        //         username: userName,
        //         password: userPassword,
        //         })
        //         console.log('Success')
        //         navigate(from, { replace: true });
        //         handleUserName("");
        //         handleUserPassword("");
        //     } catch (err) {
        //         const message: string = err.response.data.message;
        //         setErrorMessage(message);
        //     }
        // };
    //#endregion

    return (
        <Panel className="flex bg-indigo-50 justify-center max-w-3xl !p-0 m-4 overflow-hidden">
            <section className="flex flex-col justify-center sm:w-1/2 p-10">
                <h1 className="font-bold text-2xl text-orange-500">Sign-Up</h1>
                <p className="text-sm mt-4 text-indigo-700 dark:text-indigo-300">
                    Already have an account?{" "}
                    <span
                        className="text-orange-500 cursor-pointer"
                        onClick={onToggleForm}
                    >
            Log in
          </span>
                </p>
                {/*<form className="mt-6 flex flex-col gap-6" onSubmit={handleFormSubmit}>*/}
                <form className="mt-6 flex flex-col gap-6" >
                    <Input
                        name="username"
                        type="text"
                        primary
                        rounded
                        autoComplete="off"
                        onChange={setUser}
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        required
                        ref={userRef}
                    >
                        Username
                        <span className={validName ? 'inline-block ml-1 text-green-500' : 'invisible absolute'}>
                            <FaCheck/>
                        </span>
                        <span className={validName || !user ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                            <FaTimes/>
                        </span>
                    </Input>
                    <p id='uidnote' className={userFocus && user && !validName ? 'block bg-white rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5': 'invisible opacity-0 absolute'}>
                        <IoIosInformationCircleOutline className='inline relative bottom-0.5 mr-1 text-lg'/>
                        4 to 24 characters<br/>
                        Must begin with a letter.<br/>
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <Password
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                        onChange={setPwd}
                        primary
                        rounded
                        autoComplete="off"
                        required
                    >
                        Password
                    </Password>
                    <p ref={errRef} className={errMsg ? 'block' : 'invisible absolute'} aria-live='assertive'>{errMsg}</p>
                    {/*{errorMessage && (*/}
                    {/*    <Panel className="text-red-400 bg-white -mt-2 py-0.5 px-1.5">*/}
                    {/*        {errorMessage}*/}
                    {/*    </Panel>*/}
                    {/*)}*/}
                    <Button primary rounded type="submit" className="mt-6" //onClick={handleFormSubmit}

                    >
                        <>
                            <CiLogin />
                            Sign up
                        </>
                    </Button>
                </form>
                <p className="text-sm mt-4 text-indigo-700 dark:text-indigo-300">
                    By creating your account, you agree to the{" "}
                    <a className="underline" href="/">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a className="underline" href="/">
                        Privacy Policy
                    </a>
                </p>
            </section>
            <div className="sm:block hidden w-1/2">
                <img src={LoginImage} alt="Decor" className='h-full w-full object-cover dark:invert'/>
            </div>
        </Panel>
    );
}

export default Register;