import React, { useEffect } from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import Button from "../common/Button";
import Input from "../common/Input";
import Panel from "../common/Panel";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { UserRole } from "../../enums/userRole";
import { User } from "../../interfaces/user";
import { Logo } from "../common/Logo";
import { GrPowerReset } from "react-icons/gr";

const RESET_URL = "/reset";

interface ApiResponse {
  accessToken?: string;
  roles?: UserRole[];
  user?: User;
}
export const Reset: React.FC = () => {
  const { userEmail, setUserEmail, errMsg, setErrMsg, userRef, errRef } =
    useLoginRegister();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userEmail]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<ApiResponse>(
        RESET_URL,
        {
          userEmail: userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        console.log("Mail has been sent");
        setUserEmail("");
      }
    } catch (err) {
      if (!(err instanceof AxiosError) || !err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(
          err.response.data.message ||
            "There is no such an account with this email. Try another one"
        );
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <Panel className="bg-indigo-50 flex flex-col justify-between items-center max-w-[450px] h-auto md:h-[400px] overflow-hidden m-4 p-6 md:p-10 ">
      <Logo />
      <section className="flex flex-col gap-5 md:gap-10">
        <div className="flex justify-center items-center gap-2">
          <h2 className="font-bold text-3xl text-orange-500 text-center">
            Reset Password
          </h2>
          <GrPowerReset className="text-2xl text-orange-500" />
        </div>
        <p className="text-sm text-indigo-800 dark:text-indigo-300">
          Enter the username or email associated with your account and we'll
          send you a link to reset your password.
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            name="userEmail"
            type="email"
            primary
            rounded
            ref={userRef}
            autoComplete="off"
            onChange={setUserEmail}
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
