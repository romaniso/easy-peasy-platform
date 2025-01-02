import React from "react";
import UserProfileForms from "../components/profile/UserProfileForms";
import { Panel } from "../components/common/Panel";
import { ProfileAvatar } from "../components/profile/ProfileAvatar";
import useUser from "../hooks/useUser";
import { useTranslation } from "react-i18next";

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  const { t } = useTranslation("profile");
  return (
    <div className="h-full md:p-12">
      <Panel className="bg-white flex md:flex-row flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full">
        <div className="flex-shrink h-1/5 md:h-full md:basis-2/5 flex flex-col justify-center items-center bg-gradient-to-r from-orange-500 to-orange-300 dark:from-stone-900 dark:to-stone-800 p-3 md:p-5">
          <ProfileAvatar />
          <p className="text-center mt-1 md:mt-10 text-xl md:text-3xl text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow">
            {user.firstName || user.username} {user.lastName}
          </p>
          <blockquote className="text-center mt-10 text-lg text-indigo-900 dark:text-indigo-200 border-t border-indigo-600/50 dark:border-indigo-200/50 pt-8 italic md:block hidden">
            {t("proverb.content")}
            <footer className="text-right mt-2 font-thin text-sm">
              {t("proverb.author")}
            </footer>
          </blockquote>
        </div>
        <UserProfileForms />
      </Panel>
    </div>
  );
};

export default ProfilePage;
