import React, { useState } from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import { CiLogin } from "react-icons/ci";
import Button from "../Button";
import LoginImage from "../../assets/images/login-image.jpg";
import Password from "./Password";
import Input from "../Input";
import Panel from "../Panel";
// import Checkbox from "../Checkbox";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

// import userLogin from "../auth/userLogin";
// import { useNavigate, useLocation } from "react-router-dom";
interface SignupProps {
    onToggleForm(): void;
}
const Login: React.FC<SignupProps> = ({ onToggleForm }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        handleUserName,
        showPassword,
        toggleShowPassword,
        handleUserPassword,
        rememberMe,
        handleRememberMe,
        userName,
        userPassword,
    } = useLoginRegister();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.path || "/dashboard";

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/login', {
                username: userName,
                password: userPassword,
            })
            console.log('Success')
            navigate(from, { replace: true });
            handleUserName("");
            handleUserPassword("");
        } catch (err) {
            const message: string = err.response.data.message;
            setErrorMessage(message);
        }
    };

    return (
        <Panel className="flex justify-center max-w-3xl !p-0 m-4 overflow-hidden">
            <section className="flex flex-col justify-center sm:w-1/2 p-10">
                <h2 className="font-bold text-2xl text-orange-500">Login</h2>
                <p className="text-sm mt-4 text-indigo-700 dark:text-indigo-300">
                    A New user?{" "}
                    <span
                        className="text-orange-500 cursor-pointer"
                        onClick={onToggleForm}
                    >
            Sign Up
          </span>
                </p>
                {/*<form className="mt-6 flex flex-col gap-6" onSubmit={handleFormSubmit}>*/}
                <form className="mt-6 flex flex-col gap-6">
                    <Input
                        name="userName"
                        type="text"
                        primary
                        rounded
                        autoComplete="off"
                        onChange={handleUserName}
                        required
                    >
                        Email
                    </Input>
                    <Password
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                        onChange={handleUserPassword}
                        primary
                        rounded
                        autoComplete="off"
                        required
                    >
                        Password
                    </Password>
                    {errorMessage && (
                        <Panel className="text-red-400 bg-white -mt-2 py-0.5 px-1.5">
                            {errorMessage}
                        </Panel>
                    )}
                    {/*<Checkbox*/}
                    {/*    className="mt-2"*/}
                    {/*    name="rememberMe"*/}
                    {/*    checked={rememberMe}*/}
                    {/*    onChange={handleRememberMe}*/}
                    {/*>*/}
                    {/*    Remember me*/}
                    {/*</Checkbox>*/}
                    <div className="mt-6">
                        <a className="text-sm mt-4 text-indigo-700 dark:text-indigo-300" href="/">
                            Forget Password?
                        </a>
                    </div>
                    <Button primary rounded type="submit" onClick={handleFormSubmit}>
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