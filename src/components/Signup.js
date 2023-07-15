import useLoginRegister from "../hooks/use-Login-Register";
import Panel from "./Panel";
import LoginImage from "../assets/images/login-image.jpg";
import Input from "./Input";
import Password from "./Password";
import Button from "./Button";
import { CiLogin } from "react-icons/ci";
import userSignUp from "../auth/userSignUp";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Signup({ onToggleForm }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    handleUserName,
    showPassword,
    toggleShowPassword,
    handleUserPassword,
    userName,
    userPassword,
  } = useLoginRegister();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.path || "/dashboard";

  const { error, signUp } = userSignUp();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    await signUp(userName, userPassword);

    if (!error) {
      navigate(from, { replace: true });
      handleUserName("");
      handleUserPassword("");

      return;
    } else {
      setErrorMessage(error);
    }
  };

  return (
    <Panel className="flex justify-center max-w-3xl p-0 m-4">
      <div className="flex flex-col justify-center sm:w-1/2 p-10">
        {errorMessage && <p className="text-red-400 text-lg">{errorMessage}</p>}
        <h2 className="font-bold text-2xl text-[#EB7F00]">Sign-Up</h2>
        <p className="text-sm mt-4 text-sky-700">
          Already have an account?{" "}
          <span
            className="text-[#EB7F00] cursor-pointer"
            onClick={onToggleForm}
          >
            Log in
          </span>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <Input
            name="userEmail"
            type="email"
            primary
            rounded
            autoComplete="off"
            onChange={handleUserName}
            required
          >
            Your Email
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
          <Button primary rounded type="submit" className="mt-6">
            <CiLogin />
            Sign up
          </Button>
        </form>
        <p className="text-sm mt-4 text-sky-700">
          By creating your account, you agree to the{" "}
          <a className="underline" href="/">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="underline" href="/">
            Privacy Policy
          </a>
        </p>
      </div>
      <div className="sm:block hidden w-1/2">
        <img src={LoginImage} alt="Decor" />
      </div>
    </Panel>
  );
}

export default Signup;
