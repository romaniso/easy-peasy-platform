// import { Input } from "../Input";
import { Button } from "../common/Button";
import { ReactElement, SyntheticEvent, useState } from "react";
import { CheckboxButton } from "../common/CheckboxButton";
import { User } from "../../interfaces/user";
import { axiosPrivate } from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { MotivationItemText } from "../../enums/motivationItem";
import { IoIosArrowForward } from "react-icons/io";
import { ToastType } from "../../enums/toast";
import { useToast } from "../../context/ToastContext";
import { useTranslation } from "react-i18next";

export type MotivationItem = {
  text: MotivationItemText;
  icon: ReactElement;
};
interface MotivationFormProps {
  items: MotivationItem[];
  switchForm: (tab: -1 | 1) => void;
}

const UPDATE_URL = "/users";

export const MotivationForm = ({
  items,
  switchForm,
}: MotivationFormProps): JSX.Element => {
  const { auth } = useAuth();
  const { setUser, user } = useUser();
  const [selectedItems, setSelectedItems] = useState<MotivationItemText[]>(
    user.motivations || []
  );

  const toast = useToast();
  const { t } = useTranslation("profile");
  const tCommon = useTranslation("common").t;

  const handleCheckboxChange = (itemText: MotivationItemText) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemText)) {
        return prevSelectedItems.filter((text) => text !== itemText);
      } else {
        return [...prevSelectedItems, itemText];
      }
    });
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const updatedUser: User = {
      username: auth.user,
      motivations: selectedItems,
    };
    try {
      const response = await axiosPrivate.put(UPDATE_URL, updatedUser, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser((prev) => {
          return {
            ...prev,
            ...updatedUser,
          };
        });
        toast?.open(t("motivation.toastMessage.success"), ToastType.Success);
      }
    } catch (err) {
      console.error(err);
      toast?.open(t("motivation.toastMessage.failure"), ToastType.Failure);
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
          {t("headers.motivationHeader")}
        </h3>
        <p className="text-indigo-900 dark:text-indigo-300 font-semibold text-center">
          {t("subheadings.motivationSubheading")}
        </p>
      </div>
      <div className="flex-shrink w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => {
          return (
            <CheckboxButton
              item={item}
              key={item.text}
              onChange={() => handleCheckboxChange(item.text)}
              checked={selectedItems.includes(item.text)}
            />
          );
        })}
      </div>
      <div className="md:self-start flex justify-between w-full gap-4">
        <Button submit primary rounded className="basis-1/2" save />
        <Button
          secondary
          rounded
          className="basis-1/2"
          onClick={handleNextForm}
        >
          <span className="flex items-center gap-2">
            {tCommon("buttons.next")}
            <IoIosArrowForward />
          </span>
        </Button>
      </div>
    </form>
  );
};
