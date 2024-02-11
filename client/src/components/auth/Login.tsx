import React, {useEffect} from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import { CiLogin } from "react-icons/ci";
import Button from "../common/Button";
import LoginImage from "../../assets/images/login-image.jpg";
import Password from "./Password";
import Input from "../common/Input";
import Panel from "../common/Panel";
import axios from "../../api/axios";
import {AxiosError} from 'axios';
import {UserRole} from "../../enums/userRole";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import {useLocation, useNavigate} from "react-router-dom";
import Checkbox from "../common/Checkbox";
import {User} from "../../interfaces/user";

const LOGIN_URL = '/auth'
interface SignupProps {
    onToggleForm(): void;
}

interface ApiResponse {
    accessToken?: string;
    roles?: UserRole[];
    user?: User;
}
const Login: React.FC<SignupProps> = ({ onToggleForm }) => {
    const {setAuth, persist, setPersist} = useAuth();
    const {setUser} = useUser();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/dashboard';

    const {
        userName,
        setUserName,
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
    }, [userName, pwd]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post<ApiResponse>(LOGIN_URL, ({
                username: userName,
                password: pwd,
            }), {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            // setAuth Context
            setAuth({user: userName, pwd, roles, accessToken});
            // setUserContext
            // fetch to get user info and store it in context
            setUser({
                ...response.data.user,
                username: userName,
            })
            setUserName("");
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
    const togglePersist = () => {
        setPersist(prev => !prev);
    }
    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist));
    }, [persist]);

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
                            onChange={setUserName}
                            required
                        >
                            Username
                        </Input>
                        <Password
                            name="password"
                            previewEnabled
                            onChange={setPwd}
                            primary
                            rounded
                            autoComplete="off"
                            required
                        >
                            Password
                        </Password>
                        <Checkbox checked={persist} name='persist' onChange={togglePersist}>
                            Remember me?
                        </Checkbox>
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