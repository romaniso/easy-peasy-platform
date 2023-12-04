import { useState } from "react";
import useTop from "../hooks/useTop";
import Login from "../components/Login";
import Signup from "../components/Signup";

function AuthenticationPage() {
  useTop();
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      {toggle ? (
        <Login onToggleForm={handleToggle} />
      ) : (
        <Signup onToggleForm={handleToggle} />
      )}
    </section>
  );
}

export default AuthenticationPage;
