import { Button } from "../common/Button";
import React, { useEffect, useState } from "react";
import { Password } from "../auth/Password";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";
import { ToastType } from "../../enums/toast";
import { useToast } from "../../context/ToastContext";
import { Trans, useTranslation } from "react-i18next";
import { Icon, IconType } from "../common/icon/Icon";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SETTINGS_URL = "/settings";

// @TODO: DRY
export const ChangePassword = (): JSX.Element => {
  const [prevPwd, setPrevPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [validNewPwd, setValidNewPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMath] = useState(false);
  const [newPwdFocus, setNewPwdFocus] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const toast = useToast();

  const { t } = useTranslation("settings");
  // const {validationMessage_one, validationMessage_two} = t('validation');

  // const newPwdFocus = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (prevPwd && newPwd === prevPwd) {
      console.error("Previous password and new password must be different.");
      return;
    }
    const result = PWD_REGEX.test(newPwd);
    setValidNewPwd(result);
    const match = newPwd === matchPwd; //rename to matchPwd, maybe break down to a reusable code
    setValidMath(match);
  }, [newPwd, matchPwd]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { user } = auth;

    // Additional validation in case a button is enabled with JS hack
    const v1 = PWD_REGEX.test(newPwd);
    if (!v1) {
      console.error("Invalid Entry");
      // setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axiosPrivate.post(
        SETTINGS_URL + "/password",
        {
          username: user,
          password: prevPwd,
          newPassword: newPwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );

      console.log(response.data);
      // setSuccess(true);
      // Clear up
      toast?.open(
        "You have successfully changed your password",
        ToastType.Success
      );
      setPrevPwd("");
      setNewPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!(err instanceof AxiosError) || !err.response) {
        // setErrMsg('No Server Response');
        console.error("No Server Response");
      } else if (err.response?.status === 409) {
        // setErrMsg(err.response.data.message || "Auth name Taken");
        console.error(err.response.data.message || "Auth name Taken");
      } else {
        // setErrMsg("Registration Failed")
        console.error("Registration Failed");
        console.log(err.response.data);
      }
      toast?.open("Oops something went wrong. Try again", ToastType.Failure);
      // errRef.current?.focus();
    }
  };

  return (
    <section>
      <h2 className="text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1 mb-3.5 md:mb-6">
        {t("subheadings.changePassword")}
        <Icon type={IconType.Password} />
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 md:gap-6">
          <Password
            onChange={setPrevPwd}
            secondary
            rounded
            autoComplete="off"
            required
            previewEnabled
            name="prevPwd"
            outline
          >
            {t("changePassword.prevPassword")}
          </Password>
          <Password
            onChange={setNewPwd}
            rounded
            autoComplete="off"
            required
            previewEnabled
            name="newPwd"
            secondary
            outline
            aria-describedby="newpwdnote"
            onFocus={() => setNewPwdFocus(true)}
            onBlur={() => setNewPwdFocus(false)}
          >
            {t("changePassword.newPassword")}
            <span
              className={
                validNewPwd
                  ? "inline-block ml-1 text-green-500"
                  : "invisible absolute"
              }
            >
              <Icon type={IconType.Tick} />
            </span>
            <span
              className={
                validNewPwd || !newPwd
                  ? "invisible absolute"
                  : "inline-block ml-1 text-red-500"
              }
            >
              <Icon type={IconType.Cross} />
            </span>
          </Password>
          <p
            id="newpwdnote"
            className={
              newPwdFocus && !validNewPwd
                ? "block bg-white dark:bg-stone-900 dark:border dark:border-orange-400 rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5 -mb-8 shadow z-10"
                : "invisible opacity-0 absolute"
            }
          >
            {newPwd === prevPwd ? (
              <span>
                <Icon
                  type={IconType.Exclamation}
                  className="inline relative bottom-0.5 mr-1 text-lg"
                />
                {t("validation.validationMessage_one")}
              </span>
            ) : (
              <span>
                <Icon
                  type={IconType.Exclamation}
                  className="inline relative bottom-0.5 mr-1 text-lg"
                />
                <Trans
                  defaults={t("validation.validationMessage_two")}
                  components={{ 1: <br /> }}
                />
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="percent">%</span>
              </span>
            )}
          </p>
          <Password
            onChange={setMatchPwd}
            rounded
            autoComplete="off"
            required
            name="confirmPwd"
            secondary
            outline
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          >
            {t("changePassword.confirmPassword")}
            <span
              className={
                validMatch && matchPwd
                  ? "inline-block ml-1 text-green-500"
                  : "invisible absolute"
              }
            >
              <Icon type={IconType.Tick} />
            </span>
            <span
              className={
                validMatch || !matchPwd
                  ? "invisible absolute"
                  : "inline-block ml-1 text-red-500"
              }
            >
              <Icon type={IconType.Cross} />
            </span>
          </Password>
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch
                ? "block bg-white dark:bg-stone-900 dark:border dark:border-orange-400 rounded p-1 text-sm text-orange-500 opacity-100 transition-colors duration-500 -mt-5 -mb-8 shadow z-10"
                : "invisible opacity-0 absolute"
            }
          >
            <Icon
              type={IconType.Exclamation}
              className="inline relative bottom-0.5 mr-1 text-lg"
            />
            {t("validation.validationMessage_three")}
          </p>
        </div>
        <Button
          secondary
          rounded
          save
          small
          disabled={!validNewPwd || !validMatch}
          className={
            !validNewPwd || !validMatch
              ? "w-full md:w-1/5 opacity-40 !cursor-not-allowed !p-2"
              : `w-full md:w-1/5 !p-2`
          }
        />
      </form>
    </section>
  );
};
