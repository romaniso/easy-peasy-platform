import { Button } from "../common/Button";
import { ReactElement, SyntheticEvent, useState } from "react";
import { CheckboxButton } from "../common/CheckboxButton";
import { InterestItemText } from "../../enums/interestItem";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { User } from "../../interfaces/user";
import { axiosPrivate } from "../../api/axios";
import { IoIosArrowBack } from "react-icons/io";
import { useToast } from "../../context/ToastContext";
import { ToastType } from "../../enums/toast";
import { useTranslation } from "react-i18next";

export type InterestItem = {
  text: InterestItemText;
  icon: ReactElement;
};
interface InterestsFormProps {
  items: InterestItem[];
  switchForm: (tab: -1 | 1) => void;
}

const UPDATE_URL = "/users";

export const InterestsForm = ({
  items,
  switchForm,
}: InterestsFormProps): JSX.Element => {
  const { auth } = useAuth();
  const { setUser, user } = useUser();
  const [selectedItems, setSelectedItems] = useState<InterestItemText[]>(
    user.likes || []
  );

  const toast = useToast();
  const { t } = useTranslation("profile");
  const tCommon = useTranslation("common").t;

  const handleCheckboxChange = (itemText: InterestItemText) => {
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
      likes: selectedItems,
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
        toast?.open(t("interests.toastMessage.success"), ToastType.Success);
      }
    } catch (err) {
      console.error(err);
      toast?.open(t("interests.toastMessage.failure"), ToastType.Failure);
    }
  };

  const handlePrevForm = (event: SyntheticEvent) => {
    event.preventDefault();
    switchForm(-1);
  };

  return (
    <form
      className="mx-auto flex-grow flex flex-col justify-between items-center md:py-5 md:px-7 px-3 py-5 w-full md:max-w-[600px] lr:max-w-[750px]"
      onSubmit={handleSubmit}
    >
      <div>
        <h3 className="text-indigo-500 dark:text-indigo-200 font-bold text-center drop-shadow text-xl md:text-3xl mb-1 md:mb-3">
          {t("headers.interestsHeader")}
        </h3>
        <p className="text-indigo-900 dark:text-indigo-300 font-semibold text-center">
          {t("subheadings.interestsSubheading")}
        </p>
      </div>
      <div className="flex-shrink w-full flex flex-wrap gap-2 lg:gap-4">
        {items.map((item) => {
          return (
            <CheckboxButton
              item={item}
              key={item.text}
              small
              onChange={() => handleCheckboxChange(item.text)}
              checked={selectedItems.includes(item.text)}
            />
          );
        })}
      </div>
      <div className="md:self-start flex justify-end w-full gap-4">
        <Button
          secondary
          rounded
          className="basis-1/2"
          onClick={handlePrevForm}
        >
          <span className="flex items-center gap-2">
            <IoIosArrowBack />
            {tCommon("buttons.prev")}
          </span>
        </Button>
        <Button submit primary rounded className="basis-1/2" save />
      </div>
    </form>
  );
};
