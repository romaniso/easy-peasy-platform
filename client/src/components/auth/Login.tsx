import React, {useEffect} from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import { CiLogin } from "react-icons/ci";
import Button from "../Button";
import LoginImage from "../../assets/images/login-image.jpg";
import Password from "./Password";
import Input from "../Input";
import Panel from "../Panel";
import axios from "../../api/axios";
import {AxiosError} from 'axios';
import {UserRole} from "../../enums/userRole";
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";

const LOGIN_URL = '/auth'
interface SignupProps {
    onToggleForm(): void;
}

interface ApiResponse {
    accessToken?: string;
    roles?: UserRole[];
}
const Login: React.FC<SignupProps> = ({ onToggleForm }) => {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/dashboard';

    const {
        showPassword,
        toggleShowPassword,
        user,
        setUser,
        pwd,
        setPwd,
        errMsg,
        setErrMsg,
        userRef,
        errRef,
    } = useLoginRegister();

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post<ApiResponse>(LOGIN_URL, ({
                username: user,
                password: pwd,
            }), {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log({roles, accessToken});
            setAuth({user, pwd, roles, accessToken});
            setUser("");
            setPwd("");
            navigate(from, { replace: true });
        } catch (err) {
            if(!(err instanceof AxiosError) || !err.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data.message || 'Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg(err.response.data.message || 'Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    };

    return (
            <Panel className="bg-indigo-50 flex justify-center max-w-3xl !p-0 m-4 overflow-hidden">
                <section className="flex flex-col justify-center sm:w-1/2 p-10">
                    <h2 className="font-bold text-3xl text-orange-500">Login</h2>
                    <p className="text-sm mt-4 text-indigo-700 dark:text-indigo-300">
                        A New User?{" "}
                        <span
                            className="text-orange-500 cursor-pointer underline hover:text-indigo-500"
                            onClick={onToggleForm}
                        >
                        Sign Up
                      </span>
                    </p>
                    {/*<form className="mt-6 flex flex-col gap-6" onSubmit={handleFormSubmit}>*/}
                    <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
                        <Input
                            name="username"
                            type="text"
                            primary
                            rounded
                            ref={userRef}
                            autoComplete="off"
                            onChange={setUser}
                            required
                        >
                            Username
                        </Input>
                        <Password
                            name="password"
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
                        {/*<div className="mt-6">*/}
                        {/*    <a className="text-sm mt-4 text-indigo-700 dark:text-indigo-300" href="/">*/}
                        {/*        Forget Password?*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        <p ref={errRef} className={errMsg ? 'block bg-red-500/10 dark:border dark:border-red-400 rounded p-1 text-sm font-bold text-red-500 opacity-100 transition-colors duration-500 -mt-5 shadow' : 'invisible absolute'} aria-live='assertive'>{errMsg}</p>
                        <Button primary rounded type="submit">
                            <>
                                <CiLogin />
                                Log in
                            </>
                        </Button>
                    </form>
                </section>
                <div className="sm:block hidden w-1/2">
                    <img src={LoginImage} alt="Decor" className='h-full w-full object-cover dark:invert'/>
                </div>
            </Panel>
    );
}

export default Login;