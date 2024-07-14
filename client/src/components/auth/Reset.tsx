import React, { useEffect } from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import Button from "../common/Button";
import Input from "../common/Input";
import Panel from "../common/Panel";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { UserRole } from "../../enums/userRole";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../interfaces/user";
import { Logo } from "../common/Logo";

const LOGIN_URL = "/auth";

interface ApiResponse {
  accessToken?: string;
  roles?: UserRole[];
  user?: User;
}
export const Reset: React.FC = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const { setUser } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/dashboard";

  const {
    userName,
    setUserName,
    pwd,
    setPwd,
    errMsg,
    setErrMsg,
    userRef,
    errRef,
  } = useLoginRegister();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, pwd]);

  //@FIXME: adjust to reset api
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<ApiResponse>(
        LOGIN_URL,
        {
          username: userName,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      // setAuth Context
      setAuth({ user: userName, pwd, roles, accessToken });
      // setUserContext
      // fetch to get user info and store it in context
      setUser({
        ...response.data.user,
        username: userName,
      });
      setUserName("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!(err instanceof AxiosError) || !err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response.data.message || "Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data.message || "Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <Panel className="bg-indigo-50 flex flex-col justify-between items-center max-w-[450px] h-auto md:h-[400px] overflow-hidden m-4 p-6 md:p-10 ">
      <Logo />
      <section className="flex flex-col gap-5 md:gap-10">
        <h2 className="font-bold text-3xl text-orange-500 text-center">
          Reset Password
        </h2>
        <p className="text-sm text-indigo-800">
          Enter the username or email associated with your account and we'll
          send you a link to reset your password.
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            name="username"
            type="text"
            primary
            rounded
            ref={userRef}
            autoComplete="off"
            onChange={setUserName}
            required
          >
            Enter your username or email
          </Input>
          <p
            ref={errRef}
            className={
              errMsg
                ? "block bg-red-500/10 dark:border dark:border-red-400 rounded p-1 text-sm font-bold text-red-500 opacity-100 transition-colors duration-500 -mt-5 shadow"
                : "invisible absolute"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Button primary rounded type="submit">
            Send link
          </Button>
        </form>
      </section>
    </Panel>
  );
};
