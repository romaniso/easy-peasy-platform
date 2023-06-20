import { useState } from "react";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import Button from "./Button";
import User from "./User";
import LoginImage from "../assets/images/login-image.jpg";
import Password from "./Password";
import InputField from "./InputField";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userName && userPassword) {
      const user = new User(null, userName, userPassword, rememberMe);
      console.log(user);
    } else {
      console.log("Popup shows up");
    }
  };

  const handleUserName = (value) => {
    setUserName(value);
  };
  const handleUserPassword = (event) => {
    setUserPassword(event.target.value);
  };
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 ">
      {/* Form */}
      <div className="sm:w-1/2 px-16">
        <h2 className="font-bold text-2xl text-[#EB7F00]">Login</h2>
        <p className="text-sm mt-4 text-[#163A95]">
          A New user?{" "}
          <Link className="text-[#EB7F00]" to="/register">
            Sign Up
          </Link>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <InputField
            name="userName"
            type="text"
            primary
            rounded
            autoComplete="off"
            onChange={handleUserName}
            required
          >
            User Name
          </InputField>
          <Password
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            value={userPassword}
            onChange={handleUserPassword}
          />
          <div className="mt-6 flex items-center">
            <input
              className="mr-2 appearance-none border-2 rounded-sm border-[#163A95] w-4 h-4 checked:bg-[#7797e9]"
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label
              className="text-[#163A95] cursor-pointer select-none"
              htmlFor="rememberMe"
            >
              Remember me
            </label>
          </div>
          <div className="mt-6"></div>
          <a className="text-sm mt-4 text-[#163A95]" href="#">
            Forget Password?
          </a>
          <Button primary rounded type="submit">
            <CiLogin />
            Log in
          </Button>
        </form>
      </div>
      {/* Image */}
      <div className="sm:block hidden w-1/2">
        <img className="rounded-2xl" src={LoginImage} alt="Decor" />
      </div>
    </div>
  );
}

export default LoginForm;
