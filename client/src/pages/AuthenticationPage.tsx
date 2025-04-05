import { useEffect, useState } from "react";
import { useTop } from "../hooks/useTop";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export const AuthenticationPage = (): JSX.Element => {
  useTop();
  const [toggle, setToggle] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      navigate("/dashboard");
    }
  }, [user?.accessToken, navigate]);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      {toggle ? (
        <Login onToggleForm={handleToggle} />
      ) : (
        <Register onToggleForm={handleToggle} />
      )}
    </section>
  );
};
