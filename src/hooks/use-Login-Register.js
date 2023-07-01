import { useState } from "react";
import User from "../components/User";

function useLoginRegister() {
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
      const user = new User(null, userName, userPassword);
      console.log(user);
    } else {
      console.log("Popup shows up");
    }
  };
  const handleUserName = (value) => {
    setUserName(value);
  };
  const handleUserPassword = (value) => {
    setUserPassword(value);
  };
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return {
    showPassword,
    userName,
    userPassword,
    rememberMe,
    toggleShowPassword,
    handleFormSubmit,
    handleUserName,
    handleUserPassword,
    handleRememberMe,
  };
}

export default useLoginRegister;
