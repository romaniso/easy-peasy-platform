import React, { useState } from "react";
import useTop from "../hooks/useTop";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
//import BgImage from "../assets/images/bg-auth.jpg";

const AuthenticationPage: React.FC = () => {
  useTop();
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      {/*<img
        src={BgImage}
        alt="background image"
        className="absolute inset-0 w-full object-fill opacity-10 dark:opacity-5"
      />*/}
      {toggle ? (
        <Login onToggleForm={handleToggle} />
      ) : (
        <Register onToggleForm={handleToggle} />
      )}
    </section>
  );
};

export default AuthenticationPage;
