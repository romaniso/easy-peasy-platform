import { useState } from "react";
import User from "./User";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userName && userPassword) {
      const user = new User(userName, userPassword, rememberMe);
      console.log(user);
    } else {
      console.log("Popup shows up");
    }
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleUserPassword = (event) => {
    setUserPassword(event.target.value);
  };
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <section className="form-wrapper w-full flex flex-col justify-center items-center py-5 bg-indigo-100">
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="block" htmlFor="userName">
            User Name
          </label>
          <input
            className=" bg-cyan-200 rounded"
            required
            type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={handleUserName}
          />
        </div>
        <div className="form-group">
          <label className="block" htmlFor="userPassword">
            Password
          </label>
          <input
            className=" bg-cyan-200 rounded"
            required
            type="password"
            name="userPassword"
            id="userPassword"
            value={userPassword}
            onChange={handleUserPassword}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <div className="form-group"></div>
        <a className="" href="#">
          Forget Password?
        </a>
        <button className="bg-cyan-200 rounded" type="submit">
          Log in
        </button>
        <a className="" href="#">
          A New user? Sign Up
        </a>
      </form>
    </section>
  );
}

export default LoginForm;
