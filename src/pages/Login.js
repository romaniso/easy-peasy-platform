import {useEffect, useContext} from "react";
import {useLocation} from "react-router-dom";
import LoginForm from "../components/LoginForm";
import UserContext from "../context/user";

function Login() {
    const {isNewUser, handleUser} = useContext(UserContext);
    let {pathname} = useLocation()
    useEffect(() => {
        if(pathname === "/login"){
            handleUser();
            console.log(isNewUser)
        }
    },[])
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <LoginForm />
    </section>
  );
}

export default Login;
