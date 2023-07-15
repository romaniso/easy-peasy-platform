import { useState } from "react";

function useLoginRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
    handleUserName,
    handleUserPassword,
    handleRememberMe,
  };
}

export default useLoginRegister;
