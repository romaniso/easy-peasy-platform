import { ReactElement, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateUser } from "../../store/thunks/userThunk";

import { Button } from "../common/Button";
import { CheckboxButton } from "../common/CheckboxButton";
import { MotivationItemText } from "../../enums/motivationItem";
import { ToastType } from "../../enums/toast";
import { useToast } from "../../context/ToastContext";
import { Icon, IconType } from "../common/Icon/Icon";
import { User } from "../../interfaces/user";

export type MotivationItem = {
  text: MotivationItemText;
  icon: ReactElement;
};
interface MotivationFormProps {
  items: MotivationItem[];
  switchForm: (tab: -1 | 1) => void;
}

export const MotivationForm = ({
  items,
  switchForm,
}: MotivationFormProps): JSX.Element => {
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedItems, setSelectedItems] = useState<MotivationItemText[]>(
    user?.profile.motivations || []
  );

  const toast = useToast();
  const { t: tMotivation } = useTranslation("profile");
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
    if (!user) {
      throw new Error("No user to update");
    }
    const updatedUser: User = {
      ...user,
      profile: {
        ...user?.profile,
        motivations: selectedItems,
      },
    };

    try {
      await dispatch(updateUser(updatedUser)).unwrap();
      toast?.open(
        tMotivation("motivation.toastMessage.success"),
        ToastType.Success
      );
    } catch (err) {
      console.error(err);
      toast?.open(
        tMotivation("motivation.toastMessage.failure"),
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
          {tMotivation("headers.motivationHeader")}
        </h3>
        <p className="text-indigo-900 dark:text-indigo-300 font-semibold text-center">
          {tMotivation("subheadings.motivationSubheading")}
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
        <Button
          submit
          primary
          rounded
          className="basis-1/2"
          icon={<Icon className="inline ml-1.5" type={IconType.Save} />}
          loading={isLoading}
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
