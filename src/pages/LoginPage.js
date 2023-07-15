//import { useEffect, useContext } from "react";
//import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
//import UserContext from "../context/user";

function LoginPage() {
  //  const { isNewUser, handleUser } = useContext(UserContext);
  //  let { pathname } = useLocation();
  //  useEffect(() => {
  //    if (pathname === "/login") {
  //      handleUser();
  //      console.log(isNewUser);
  //    }
  //  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </section>
  );
}

export default LoginPage;
