import useLoginRegister from "../hooks/use-Login-Register";
import { CiLogin } from "react-icons/ci";
import Button from "./Button";
import LoginImage from "../assets/images/login-image.jpg";
import Password from "./Password";
import Input from "./Input";
import Panel from "./Panel";
import Checkbox from "./Checkbox";

import userLogin from "../auth/userLogin";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Login({ onToggleForm }) {
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

  const from = location.state?.from?.pathname || "/dashboard";

  const { error, login } = userLogin();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await login(userName, userPassword);

    if (!error) {
      navigate(from, { replace: true });
      handleUserName("");
      handleUserPassword("");

      return;
    } else {
      setErrorMessage("Ooops. Email or password are invalid. Try again");
    }
  };

  return (
    <Panel className="flex justify-center max-w-3xl p-0 m-4">
      <div className="flex flex-col justify-center sm:w-1/2 p-10">
        {errorMessage && (
          <Panel className="text-red-400 text-lg bg-white mb-2 py-1">
            {errorMessage}
          </Panel>
        )}
        <h2 className="font-bold text-2xl text-[#EB7F00]">Login</h2>
        <p className="text-sm mt-4 text-[#163A95]">
          A New user?{" "}
          <span
            className="text-[#EB7F00] cursor-pointer"
            onClick={onToggleForm}
          >
            Sign Up
          </span>
        </p>
        <form className="mt-6 flex flex-col gap-6" onSubmit={handleFormSubmit}>
          <Input
            name="userName"
            type="email"
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
          <Checkbox
            className="mt-2"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMe}
          >
            Remember me
          </Checkbox>
          <div className="mt-6">
            <a className="text-sm mt-4 text-[#163A95]" href="/">
              Forget Password?
            </a>
          </div>
          <Button primary rounded type="submit">
            <CiLogin />
            Log in
          </Button>
        </form>
      </div>
      <div className="sm:block hidden w-1/2">
        <img src={LoginImage} alt="Decor" />
      </div>
    </Panel>
  );
}

export default Login;
