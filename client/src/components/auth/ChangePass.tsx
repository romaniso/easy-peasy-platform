//#region imports
import React, { useEffect } from "react";
import useLoginRegister from "../../hooks/useLoginRegister";
import Panel from "../common/Panel";
import LoginImage from "../../assets/images/login-image.jpg";
import { Password } from "./Password";
import Button from "../common/Button";
import { CiLogin } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
//#endregion

interface ApiResponse {
  data: {
    message: string;
  };
}

interface ChangePassProps {
  token: string;
}

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RESET_URL = "/reset";
export const ChangePass = ({ token }: ChangePassProps): JSX.Element => {
  const {
    pwd,
    setPwd,
    validPwd,
    setValidPwd,
    pwdFocus,
    setPwdFocus,
    matchPwd,
    setMatchPwd,
    validMatch,
    setValidMatch,
    matchFocus,
    setMatchFocus,
    errMsg,
    setErrMsg,
    success,
    setSuccess,
    errRef,
  } = useLoginRegister();

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Additional validation in case a button is enabled with JS hack
    const v1 = PWD_REGEX.test(pwd);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post<ApiResponse>(
        RESET_URL + "/" + token,
        JSON.stringify({
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      // Clear up
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!(err instanceof AxiosError) || !err.response) {
        setErrMsg(
          "Something went wrong. Send a link to your email and try again."
        );
      } else {
        setErrMsg("No Server Response");
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <Panel className="flex bg-indigo-50 justify-center max-w-3xl !p-0 m-4 overflow-hidden">
          <section className="flex flex-col justify-center items-center gap-6 sm:w-1/2 p-10">
            <h1 className="font-bold text-4xl text-orange-500">Success!</h1>
            <p className="text-center text-base dark:text-indigo-300 text-indigo-800 bg-green-500/15 py-2 px-1.5 rounded-md shadow-md">
              Your password has been successfully changed. Please, log in now
              using your new password
            </p>
            <Link to="/auth">
              <Button primary rounded>
                Log In
              </Button>
            </Link>
          </section>
          <div className="sm:block hidden w-1/2">
            <img
              src={LoginImage}
              alt="Decor"
              className="h-full w-full object-cover dark:invert"
            />
          </div>
        </Panel>
      ) : (
        <Panel className="flex bg-indigo-50 justify-center max-w-3xl !p-0 m-4 overflow-hidden">
          <section className="flex flex-col justify-center sm:w-1/2 p-10">
            <h1 className="font-bold text-3xl text-orange-500">
              Change Password
            </h1>
            <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
              {/*PASSWORD*/}
              <Password
                name="pwd"
                previewEnabled
                onChange={setPwd}
                primary
                rounded
                autoComplete="off"
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              >
                Password
                <span
                  className={
                    validPwd
                      ? "inline-block ml-1 text-green-500"
                      : "invisible absolute"
                  }
                >
                  <FaCheck />
                </span>
                <span
                  className={
                    validPwd || !pwd
                      ? "invisible absolute"
                      : "inline-block ml-1 text-red-500"
                  }
                >
                  <FaTimes />
                </span>
              </Password>
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "block bg-white dark:bg-transparent dark:border dark:border-orange-400 rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5 shadow"
                    : "invisible opacity-0 absolute"
                }
              >
                <IoIosInformationCircleOutline className="inline relative bottom-0.5 mr-1 text-lg" />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="percent">%</span>
              </p>

              {/*CONFIRM PASSWORD*/}
              <Password
                name="confirm_pwd"
                onChange={setMatchPwd}
                primary
                rounded
                autoComplete="off"
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              >
                Confirm Password
                <span
                  className={
                    validMatch && matchPwd
                      ? "inline-block ml-1 text-green-500"
                      : "invisible absolute"
                  }
                >
                  <FaCheck />
                </span>
                <span
                  className={
                    validMatch || !matchPwd
                      ? "invisible absolute"
                      : "inline-block ml-1 text-red-500"
                  }
                >
                  <FaTimes />
                </span>
              </Password>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "block bg-white dark:bg-transparent dark:border dark:border-orange-400 rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5 shadow"
                    : "invisible opacity-0 absolute"
                }
              >
                <IoIosInformationCircleOutline className="inline relative bottom-0.5 mr-1 text-lg" />
                Must match the first password input field.
              </p>
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
              <Button
                primary
                disabled={!validPwd || !validMatch}
                rounded
                type="submit"
                className={
                  !validPwd || !validMatch
                    ? "mt-6 opacity-40 !cursor-not-allowed"
                    : `mt-6`
                }
              >
                <>
                  <CiLogin />
                  Change Password
                </>
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
      )}
    </>
  );
};
