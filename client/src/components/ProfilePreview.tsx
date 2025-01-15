import { ReactElement } from "react";
import { Dropdown } from "./common/Dropdown";
import { useLogout } from "../hooks/useLogout";
import { MiniAvatar } from "./MiniAvatar";
import { useToast } from "../context/ToastContext";
import { ToastType } from "../enums/toast";
import { useUser } from "../hooks/useUser";
import { useTranslation } from "react-i18next";
import { Icon, IconType } from "./common/icon/Icon";

export interface AvatarItem {
  icon?: ReactElement;
  label: string;
  path?: string;
  isLogoutBtn?: true;
  eventHandler?: () => void;
}

interface ProfilePreviewProps {
  dropdown?: true;
}

export const ProfilePreview = ({
  dropdown,
}: ProfilePreviewProps): JSX.Element => {
  const { user } = useUser();
  const logout = useLogout();
  const toast = useToast();
  const { t } = useTranslation("common");

  const handleLogout = async () => {
    await logout();
    toast?.open("You have been successfully logged out", ToastType.Success);
  };
  return (
    <div className="flex md:items-center gap-1 md:ml-4 md:rounded-full md:border border-indigo-300 md:shadow md:pr-2 cursor-pointer hover:bg-white/40 dark:hover:bg-black/40 transition-colors duration-200 dark:text-indigo-200 text-indigo-900 font-semibold">
      <MiniAvatar />
      {dropdown ? (
        <Dropdown
          avatar
          label={user.username as string}
          content={[
            {
              icon: <Icon type={IconType.User} className="text-xl" />,
              label: t("navbar.profile.profile"),
              path: "/profile",
            },
            {
              icon: <Icon type={IconType.Settings} className="text-xl" />,
              label: t("navbar.profile.settings"),
              path: "/settings",
            },
            {
              icon: <Icon type={IconType.Logout} className="text-xl" />,
              label: t("navbar.profile.logout"),
              eventHandler: handleLogout,
              isLogoutBtn: true,
            },
          ]}
        />
      ) : (
        <span className="px-1">{user.username as string}</span>
      )}
    </div>
  );
};
