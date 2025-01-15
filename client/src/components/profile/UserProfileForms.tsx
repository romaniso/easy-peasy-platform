import { ReactElement, useState } from "react";
import { IconsTabBar } from "../common/IconsTabBar";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { MotivationForm, MotivationItem } from "./MotivationForm";
import { InterestsForm, InterestItem } from "./InterestsForm";
import { MotivationItemText } from "../../enums/motivationItem";
import { InterestItemText } from "../../enums/interestItem";
import { useTranslation } from "react-i18next";
import { Icon, IconType } from "../common/icon/Icon";

const UserProfileForms = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { t } = useTranslation("profile");

  const userForms = [
    {
      label: "personal",
      content: t("headers.personalInfoHeader"),
      icon: <Icon type={IconType.Form} />,
    },
    {
      label: "motivation",
      content: t("headers.motivationHeader"),
      icon: <Icon type={IconType.Motivation} />,
    },
    {
      label: "interests",
      content: t("headers.interestsHeader"),
      icon: <Icon type={IconType.Interests} />,
    },
  ];
  const motivationItems: MotivationItem[] = [
    { text: MotivationItemText.Family, icon: <Icon type={IconType.Family} /> },
    { text: MotivationItemText.Career, icon: <Icon type={IconType.Career} /> },
    { text: MotivationItemText.School, icon: <Icon type={IconType.School} /> },
    {
      text: MotivationItemText.Traveling,
      icon: <Icon type={IconType.Traveling} />,
    },
    { text: MotivationItemText.Exams, icon: <Icon type={IconType.Exams} /> },
    {
      text: MotivationItemText.SelfDevelopment,
      icon: <Icon type={IconType.SelfDevelopment} />,
    },
    {
      text: MotivationItemText.Emigration,
      icon: <Icon type={IconType.Emigration} />,
    },
    {
      text: MotivationItemText.Culture,
      icon: <Icon type={IconType.Culture} />,
    },
  ];
  const interestItems: InterestItem[] = [
    { text: InterestItemText.Music, icon: <Icon type={IconType.Music} /> },
    { text: InterestItemText.Films, icon: <Icon type={IconType.Films} /> },
    { text: InterestItemText.IT, icon: <Icon type={IconType.IT} /> },
    { text: InterestItemText.Reading, icon: <Icon type={IconType.Reading} /> },
    { text: InterestItemText.Art, icon: <Icon type={IconType.Art} /> },
    { text: InterestItemText.Gaming, icon: <Icon type={IconType.Gaming} /> },
    { text: InterestItemText.Sports, icon: <Icon type={IconType.Sports} /> },
    { text: InterestItemText.Fashion, icon: <Icon type={IconType.Fashion} /> },
    { text: InterestItemText.Science, icon: <Icon type={IconType.Science} /> },
    { text: InterestItemText.Nature, icon: <Icon type={IconType.Nature} /> },
    { text: InterestItemText.History, icon: <Icon type={IconType.History} /> },
    {
      text: InterestItemText.Economics,
      icon: <Icon type={IconType.Economics} />,
    },
    {
      text: InterestItemText.Marketing,
      icon: <Icon type={IconType.Marketing} />,
    },
    { text: InterestItemText.Beauty, icon: <Icon type={IconType.Beauty} /> },
    { text: InterestItemText.Animals, icon: <Icon type={IconType.Animals} /> },
    {
      text: InterestItemText.SocialMedia,
      icon: <Icon type={IconType.SocialMedia} />,
    },
    {
      text: InterestItemText.Cultures,
      icon: <Icon type={IconType.Culture} />,
    },
    {
      text: InterestItemText.Traveling,
      icon: <Icon type={IconType.Traveling} />,
    },
    {
      text: InterestItemText.Medicine,
      icon: <Icon type={IconType.Medicine} />,
    },
    { text: InterestItemText.Cooking, icon: <Icon type={IconType.Cooking} /> },
    { text: InterestItemText.Fitness, icon: <Icon type={IconType.Fitness} /> },
    {
      text: InterestItemText.ContentMaking,
      icon: <Icon type={IconType.ContentMaking} />,
    },
    {
      text: InterestItemText.Cartoons,
      icon: <Icon type={IconType.Cartoons} />,
    },
  ];

  const switchForm = (tab: -1 | 1): void => {
    const switchedTab = activeTab + tab;
    if (switchedTab >= 0 && switchedTab <= userForms.length - 1) {
      setActiveTab((prev) => {
        return prev + tab;
      });
    } else {
      console.error("Incorrect tab order number");
    }
  };

  let content: ReactElement | null = null;

  switch (activeTab) {
    case 0:
      content = <PersonalInformationForm switchForm={switchForm} />;
      break;
    case 1:
      content = (
        <MotivationForm items={motivationItems} switchForm={switchForm} />
      );
      break;
    case 2:
      content = <InterestsForm items={interestItems} switchForm={switchForm} />;
      break;
  }

  return (
    <section className="flex-shrink w-full h-full flex flex-col gap-2 md:gap-4">
      <IconsTabBar
        className="pt-6 md:max-w-[650px] mx-auto"
        activeTab={activeTab}
        items={userForms}
        setActiveTab={setActiveTab}
      />
      {content}
    </section>
  );
};

export default UserProfileForms;
