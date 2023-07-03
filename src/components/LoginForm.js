import useLoginRegister from "../hooks/use-Login-Register";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import Button from "./Button";
import LoginImage from "../assets/images/login-image.jpg";
import Password from "./Password";
import Input from "./Input";
import Panel from "./Panel";
import Checkbox from "./Checkbox";
function LoginForm() {
  const {
    handleFormSubmit,
    handleUserName,
    showPassword,
    toggleShowPassword,
    handleUserPassword,
    rememberMe,
    handleRememberMe,
  } = useLoginRegister();

  return (
    <Panel className="flex justify-center max-w-3xl p-0 m-4">
      <div className="flex flex-col justify-center sm:w-1/2 p-10">
        <h2 className="font-bold text-2xl text-[#EB7F00]">Login</h2>
        <p className="text-sm mt-4 text-[#163A95]">
          A New user?{" "}
          <Link className="text-[#EB7F00]" to="/register">
            Sign Up
          </Link>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <Input
            name="userName"
            type="text"
            primary
            rounded
            autoComplete="off"
            onChange={handleUserName}
            required
          >
            User Name
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

export default LoginForm;
