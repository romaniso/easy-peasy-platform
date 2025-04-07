import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, updateUser } from "../../store/store";

import { Button } from "../common/Button";
import { CheckboxButton } from "../common/CheckboxButton";
import { InterestItemText } from "../../enums/interestItem";
import { useToast } from "../../context/ToastContext";
import { ToastType } from "../../enums/toast";
import { Icon, IconType } from "../common/Icon/Icon";

export type InterestItem = {
  text: InterestItemText;
  icon: JSX.Element;
};
interface InterestsFormProps {
  items: InterestItem[];
  switchForm: (tab: -1 | 1) => void;
}

export const InterestsForm = ({
  items,
  switchForm,
}: InterestsFormProps): JSX.Element => {
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const [selectedItems, setSelectedItems] = useState<InterestItemText[]>(
    user?.profile.likes || []
  );

  const dispatch = useDispatch<AppDispatch>();

  const toast = useToast();
  const { t: tProfile } = useTranslation("profile");
  const { t: tCommon } = useTranslation("common");

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
    if (!user) {
      throw new Error("No user to update");
    }
    const updatedUser = {
      ...user,
      profile: {
        ...user?.profile,
        likes: selectedItems,
      },
    };

    try {
      await dispatch(updateUser(updatedUser)).unwrap();
      toast?.open(
        tProfile("interests.toastMessage.success"),
        ToastType.Success
      );
    } catch (err) {
      console.error(err);
      toast?.open(
        tProfile("interests.toastMessage.failure"),
        ToastType.Failure
      );
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
          {tProfile("headers.interestsHeader")}
        </h3>
        <p className="text-indigo-900 dark:text-indigo-300 font-semibold text-center">
          {tProfile("subheadings.interestsSubheading")}
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
            <Icon type={IconType.ChevronCompactLeft} />
            {tCommon("buttons.prev")}
          </span>
        </Button>
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
      </div>
    </form>
  );
};
