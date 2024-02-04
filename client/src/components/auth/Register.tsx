//#region imports
import React, {useEffect} from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import Panel from "../Panel";
import LoginImage from "../../assets/images/login-image.jpg";
import Input from "../Input";
import Password from "./Password";
import Button from "../Button";
import {CiLogin} from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "../../api/axios";
import {AxiosError} from "axios";
//#endregion

interface ApiResponse {
    data: {
        message: string;
    }
}

interface SignupProps {
    onToggleForm(): void;
}
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'
const Register: React.FC<SignupProps> = ({ onToggleForm }) => {
    const {
        showPassword,
        toggleShowPassword,
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
    } = useLoginRegister();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(userName);
        setValidName(result);
    }, [userName]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
       setErrMsg('');
    }, [userName, pwd, matchPwd])
        const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            // Additional validation in case a button is enabled with JS hack
            const v1 = USER_REGEX.test(userName);
            const  v2 = PWD_REGEX.test(pwd);
            if(!v1 || !v2) {
                setErrMsg('Invalid Entry');
                return;
            }
            try {
                const response = await axios.post<ApiResponse>(REGISTER_URL, JSON.stringify({
                username: userName,
                password: pwd,
                }), {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                });
                setSuccess(true);
                // Clear up
                setUserName("");
                setPwd("");
                setMatchPwd("");
                // navigate(from, { replace: true });
            } catch (err) {
                if(!(err instanceof AxiosError) || !err.response){
                    setErrMsg('No Server Response');
                } else if(err.response?.status === 409) {
                    setErrMsg(err.response.data.message || "Auth name Taken");
                } else {
                    setErrMsg("Registration Failed")
                }
                errRef.current?.focus();

            }
        };

    return (
        <>
            {success ? (
                <Panel className="flex bg-indigo-50 justify-center max-w-3xl !p-0 m-4 overflow-hidden">
                    <section className="flex flex-col justify-center items-center gap-10 sm:w-1/2 p-10">
                        <h1 className="font-bold text-4xl text-orange-500">Success!</h1>
                        <p className='text-center text-base dark:text-indigo-400 text-indigo-800'>Your account has been successfully created. Please, log in now using the same username and password</p>
                        <p>
                            <Button primary rounded onClick={onToggleForm}>
                                Log In
                            </Button>

                        </p>
                    </section>
                    <div className="sm:block hidden w-1/2">
                        <img src={LoginImage} alt="Decor" className='h-full w-full object-cover dark:invert'/>
                    </div>
                </Panel>
            )
            : (
                <Panel className="flex bg-indigo-50 justify-center max-w-3xl !p-0 m-4 overflow-hidden">
                    <section className="flex flex-col justify-center sm:w-1/2 p-10">
                        <h1 className="font-bold text-3xl text-orange-500">Sign-Up</h1>
                        <p className="text-sm mt-4 text-indigo-700 dark:text-indigo-300">
                            Already have an account?{" "}
                            <span
                                className="text-orange-500 cursor-pointer underline hover:text-indigo-500"
                                onClick={onToggleForm}
                            >
                                Log in
                            </span>
                        </p>
                        <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
                            {/*USERNAME*/}
                            <Input
                                name="username"
                                type="text"
                                primary
                                rounded
                                autoComplete="off"
                                onChange={setUserName}
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
                                <span className={validName || !userName ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                            <FaTimes/>
                        </span>
                            </Input>
                            <p id='uidnote' className={userFocus && userName && !validName ? 'block bg-white dark:bg-transparent dark:border dark:border-orange-400 rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5 shadow': 'invisible opacity-0 absolute'}>
                                <IoIosInformationCircleOutline className='inline relative bottom-0.5 mr-1 text-lg'/>
                                4 to 24 characters<br/>
                                Must begin with a letter.<br/>
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            {/*PASSWORD*/}
                            <Password
                                name='pwd'
                                showPassword={showPassword}
                                toggleShowPassword={toggleShowPassword}
                                onChange={setPwd}
                                primary
                                rounded
                                autoComplete="off"
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby='pwdnote'
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            >
                                Password
                                <span className={validPwd ? 'inline-block ml-1 text-green-500' : 'invisible absolute'}>
                            <FaCheck/>
                        </span>
                                <span className={validPwd || !pwd ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                            <FaTimes/>
                        </span>
                            </Password>
                            <p id='pwdnote' className={pwdFocus && !validPwd ? 'block bg-white dark:bg-transparent dark:border dark:border-orange-400 rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5 shadow': 'invisible opacity-0 absolute'}>
                                <IoIosInformationCircleOutline className='inline relative bottom-0.5 mr-1 text-lg'/>
                                8 to 24 characters.<br/>
                                Must include uppercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: <span aria-label='exclamation mark'>!</span>
                                <span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span><span aria-label='percent'>%</span>
                            </p>

                            {/*CONFIRM PASSWORD*/}
                            <Password
                                name='confirm_pwd'
                                onChange={setMatchPwd}
                                primary
                                rounded
                                autoComplete="off"
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby='confirmnote'
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            >
                                Confirm Password
                                <span className={validMatch && matchPwd ? 'inline-block ml-1 text-green-500' : 'invisible absolute'}>
                            <FaCheck/>
                        </span>
                                <span className={validMatch || !matchPwd ? 'invisible absolute' : 'inline-block ml-1 text-red-500'}>
                            <FaTimes/>
                        </span>
                            </Password>
                            <p id='confirmnote' className={matchFocus && !validMatch ? 'block bg-white dark:bg-transparent dark:border dark:border-orange-400 rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5 shadow': 'invisible opacity-0 absolute'}>
                                <IoIosInformationCircleOutline className='inline relative bottom-0.5 mr-1 text-lg'/>
                                Must match the first password input field.
                            </p>


                            <p ref={errRef} className={errMsg ? 'block bg-red-500/10 dark:border dark:border-red-400 rounded p-1 text-sm font-bold text-red-500 opacity-100 transition-colors duration-500 -mt-5 shadow' : 'invisible absolute'} aria-live='assertive'>{errMsg}</p>
                            <Button primary disabled={!validName || !validPwd || !validMatch} rounded type="submit" className={!validName || !validPwd || !validMatch ? 'mt-6 opacity-40 !cursor-not-allowed' :`mt-6`}
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
                )
            }
        </>
    );
}

export default Register;