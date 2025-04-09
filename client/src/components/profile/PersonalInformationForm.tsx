import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/thunks/userThunk";
import { AppDispatch, RootState } from "../../store/store";

import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { User } from "../../interfaces/user";
import { ToastType } from "../../enums/toast";
import { useToast } from "../../context/ToastContext";
import { Icon, IconType } from "../common/Icon/Icon";

const FIRST_NAME_REGEX = /^[a-zA-Z][a-zA-Z\s'-]{1,50}$/;
const LAST_NAME_REGEX = /^[a-zA-Z][a-zA-Z\s'-]{1,50}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface PersonalInformationFormProps {
  switchForm: (tab: -1 | 1) => void;
}

// @TODO: break it down to hook, before sending req validate it, show info with Toast
// @TODO: break these states gown to an object state
export const PersonalInformationForm = ({
  switchForm,
}: PersonalInformationFormProps): JSX.Element => {
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState<string>("");
  const [validFirstName, setValidFirstName] = useState<boolean>(false);
  const [, setFirstNameFocus] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>("");
  const [validLastName, setValidLastName] = useState<boolean>(false);
  const [, setLastNameFocus] = useState<boolean>(false);

  const [userEmail, setUserEmail] = useState<string>("");
  const [validUserEmail, setValidUserEmail] = useState<boolean>(false);
  const [, setUserEmailFocus] = useState<boolean>(false);

  const [birthday, setBirthday] = useState<string>("");
  const [validBirthday, setValidBirthday] = useState<boolean>(false);
  const [, setBirthdayFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const toast = useToast();
  const { t: tProfile } = useTranslation("profile");
  const { t: tCommon } = useTranslation("common");

  const validateBirthday = (stringDate: string): boolean => {
    const parsedDate = stringDate ? new Date(stringDate) : undefined;
    const currentDate = new Date();
    return !!(
      parsedDate &&
      !isNaN(parsedDate.getTime()) &&
      parsedDate <= currentDate
    );
  };

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);
  //PRE Validation - FIRSTNAME
  useEffect(() => {
    if (firstName.trim() === "") {
      // Skip validation for empty input
      setValidFirstName(true);
      return;
    }
    const result = FIRST_NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);
  //PRE Validation - LASTNAME
  useEffect(() => {
    if (lastName.trim() === "") {
      // Skip validation for empty input
      setValidLastName(true);
      return;
    }
    const result = LAST_NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);
  //PRE Validation - EMAIL
  useEffect(() => {
    if (userEmail.trim() === "") {
      // Skip validation for empty input
      setValidUserEmail(true);
      return;
    }

    const result = EMAIL_REGEX.test(userEmail);
    setValidUserEmail(result);
  }, [userEmail]);
  //PRE Validation - B-DAY
  useEffect(() => {
    if (!birthday) {
      // Skip validation for undefined birthday
      setValidBirthday(true);
      return;
    }

    setValidBirthday(validateBirthday(birthday));
  }, [birthday]);
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    // Additional validation in case a button is enabled with JS hack
    const v1 = LAST_NAME_REGEX.test(lastName);
    const v2 = FIRST_NAME_REGEX.test(firstName);
    const v3 = EMAIL_REGEX.test(userEmail);
    if (
      (!v1 && lastName.length > 0) ||
      (!v2 && firstName.length > 0) ||
      (!v3 && userEmail.length > 0) ||
      !validUserEmail
    ) {
      setErrMsg("Invalid Entry");
      return;
    }

    if (!user) {
      setErrMsg("No user to update");
      return;
    }

    const updatedUser: User = {
      username: user.username,
      profile: {
        ...user.profile,
        firstName,
        lastName,
        email: userEmail,
        birthday,
      },
      roles: user.roles,
      accessToken: user.accessToken,
    };

    try {
      await dispatch(updateUser(updatedUser)).unwrap();
      toast?.open(
        tProfile("personalInfo.toastMessage.success"),
        ToastType.Success
      );
    } catch (err) {
      console.error(err);
      toast?.open(
        tProfile("personalInfo.toastMessage.failure"),
        ToastType.Failure
      );
    }
  };

  const handleNextForm = (event: SyntheticEvent) => {
    event.preventDefault();

    switchForm(1);
  };

  return (
    <form
      className="mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-5 w-full md:max-w-[600px] lr:max-w-[750px]"
      onSubmit={handleSubmit}
    >
      <div>
        <h3 className="text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-xl md:text-3xl mb-1 md:mb-3">
          {tProfile("headers.personalInfoHeader")}
        </h3>
        <p className="text-indigo-900 dark:text-indigo-300 font-semibold text-center">
          {tProfile("subheadings.personalInfoSubheading")}
        </p>
      </div>
      <div className="flex-shrink flex flex-col gap-10 w-full">
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
        <Input
          className=""
          name="firstName"
          type="text"
          secondary
          rounded
          outline
          autoComplete="off"
          lg
          onChange={setFirstName}
          prevValue={user?.profile.firstName || ""}
          onFocus={() => setFirstNameFocus(true)}
          onBlur={() => setFirstNameFocus(false)}
          ref={firstNameRef}
        >
          {tProfile("personalInfo.firstName")}
          <span
            className={
              validFirstName && firstName
                ? "inline-block ml-1 text-green-500"
                : "invisible absolute"
            }
          >
            <Icon type={IconType.Tick} />
          </span>
          <span
            className={
              validFirstName
                ? "invisible absolute"
                : "inline-block ml-1 text-red-500"
            }
          >
            <Icon type={IconType.Cross} />
          </span>
        </Input>
        <Input
          className=""
          name="firstName"
          type="text"
          secondary
          rounded
          outline
          autoComplete="off"
          lg
          prevValue={user?.profile.lastName || ""}
          onFocus={() => setLastNameFocus(true)}
          onBlur={() => setLastNameFocus(false)}
          onChange={setLastName}
          ref={lastNameRef}
        >
          {tProfile("personalInfo.lastName")}
          <span
            className={
              validLastName && lastName
                ? "inline-block ml-1 text-green-500"
                : "invisible absolute"
            }
          >
            <Icon type={IconType.Tick} />
          </span>
          <span
            className={
              validLastName
                ? "invisible absolute"
                : "inline-block ml-1 text-red-500"
            }
          >
            <Icon type={IconType.Cross} />
          </span>
        </Input>
        <Input
          className=""
          name="email"
          type="email"
          secondary
          rounded
          outline
          autoComplete="off"
          lg
          prevValue={user?.profile.email || ""}
          onChange={setUserEmail}
          onFocus={() => setUserEmailFocus(true)}
          onBlur={() => setUserEmailFocus(false)}
        >
          {tProfile("personalInfo.email")}
          <span
            className={
              validUserEmail && userEmail
                ? "inline-block ml-1 text-green-500"
                : "invisible absolute"
            }
          >
            <Icon type={IconType.Tick} />
          </span>
          <span
            className={
              validUserEmail
                ? "invisible absolute"
                : "inline-block ml-1 text-red-500"
            }
          >
            <Icon type={IconType.Cross} />
          </span>
        </Input>
        <Input
          className=""
          name="birthday"
          type="date"
          secondary
          rounded
          outline
          autoComplete="off"
          lg
          prevValue={user?.profile.birthday || ""}
          onChange={setBirthday}
          onFocus={() => setBirthdayFocus(true)}
          onBlur={() => setBirthdayFocus(false)}
        >
          {tProfile("personalInfo.birthday")}
          <span
            className={
              validBirthday && birthday
                ? "inline-block ml-1 text-green-500"
                : "invisible absolute"
            }
          >
            <Icon type={IconType.Tick} />
          </span>
          <span
            className={
              validBirthday
                ? "invisible absolute"
                : "inline-block ml-1 text-red-500"
            }
          >
            <Icon type={IconType.Cross} />
          </span>
        </Input>
      </div>
      <div className="md:self-start flex justify-between w-full gap-4">
        <Button
          submit
          primary
          rounded
          icon={<Icon className="inline ml-1.5" type={IconType.Save} />}
          loading={isLoading}
          disabled={
            !validFirstName ||
            !validLastName ||
            !validUserEmail ||
            !validBirthday
          }
          className={
            !validFirstName ||
            !validLastName ||
            !validUserEmail ||
            !validBirthday
              ? "opacity-40 !cursor-not-allowed basis-1/2"
              : "basis-1/2"
          }
        >
          {tCommon("buttons.save")}
        </Button>
        <Button
          secondary
          rounded
          className="basis-1/2"
          onClick={handleNextForm}
        >
          <span className="flex items-center gap-2">
            {tCommon("buttons.next")}
            <Icon type={IconType.ChevronCompactRight} />
          </span>
        </Button>
      </div>
    </form>
  );
};
