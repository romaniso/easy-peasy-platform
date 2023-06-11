import "./LoginForm.css";
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
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="userName">User Name</label>
        <input
          required
          type="text"
          name="userName"
          id="userName"
          value={userName}
          onChange={handleUserName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="userPassword">Password</label>
        <input
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
      <a href="#">Forget Password?</a>
      <button type="submit">Log in</button>
      <a href="#">A New user? Sign Up</a>
    </form>
  );
}

export default LoginForm;
