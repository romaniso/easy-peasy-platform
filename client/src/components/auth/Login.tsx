import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { clearError, setUser } from "../../store/user/userSlice";
import { loginUser } from "../../store/store";
import { useLoginRegister } from "../../hooks/useLoginRegister";
import { useAuth } from "../../hooks/useAuth";

import { Icon, IconType } from "../common/Icon/Icon";
import { Button } from "../common/Button";
import LoginImage from "../../assets/images/login-image.jpg";
import { Password } from "./Password";
import { Input } from "../common/Input";
import { Panel } from "../common/Panel";
import { Checkbox } from "../common/Checkbox";

interface LoginProps {
  onToggleForm(): void;
}

export const Login = ({ onToggleForm }: LoginProps): JSX.Element => {
  const { setAuth, persist, setPersist } = useAuth();
  const { userName, setUserName, pwd, setPwd, userRef, errRef } =
    useLoginRegister();
  const { user, isLoading, errorMsg } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/dashboard";

  useEffect(() => {
    userRef.current?.focus();
  }, [userRef]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(clearError());
    }
  }, [userName, pwd, dispatch]);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  useEffect(() => {
    //@TODO: clearup access token while logging out
    if (!user.accessToken) return;
    setAuth({
      user: userName,
      pwd,
      roles: user.roles,
      accessToken: user.accessToken || undefined,
    });
    dispatch(setUser(user));
    setUserName("");
    setPwd("");
    navigate(from, { replace: true });
  }, [user.accessToken]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(loginUser({ username: userName, password: pwd }));
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  return (
    <Panel className="bg-indigo-50 flex justify-center max-w-3xl !p-0 m-4 overflow-hidden">
      <section className="flex flex-col justify-center sm:w-1/2 p-10">
        <h2 className="font-bold text-3xl text-orange-500">Login</h2>
        <p className="text-sm mt-4 text-indigo-700 dark:text-indigo-300">
          A New User?{" "}
          <span
            className="text-orange-500 cursor-pointer underline hover:text-indigo-500"
            onClick={onToggleForm}
          >
            Sign Up
          </span>
        </p>
        <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
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
            Username
          </Input>
          <Password
            name="password"
            previewEnabled
            onChange={setPwd}
            primary
            rounded
            autoComplete="off"
            required
          >
            Password
          </Password>
          <div className="flex justify-between items-center">
            <Checkbox checked={persist} name="persist" onChange={togglePersist}>
              Remember me?
            </Checkbox>
            <Link
              to="/reset-password"
              className="text-indigo-700 dark:text-indigo-300 hover:text-orange-500"
            >
              Forget password?
            </Link>
          </div>
          <p
            ref={errRef}
            className={
              errorMsg
                ? "block bg-red-500/10 dark:border dark:border-red-400 rounded p-1 text-sm font-bold text-red-500 opacity-100 transition-colors duration-500 -mt-5 shadow"
                : "invisible absolute"
            }
            aria-live="assertive"
          >
            {errorMsg}
          </p>
          <Button
            primary
            rounded
            type="submit"
            loading={isLoading}
            icon={<Icon type={IconType.Login} />}
          >
            Log in
          </Button>
        </form>
      </section>
      <div className="sm:block hidden w-1/2">
        <img
          src={LoginImage}
          alt="Decor"
          className="h-full w-full object-cover dark:invert"
        />
      </div>
    </Panel>
  );
};
