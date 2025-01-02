import { BsExclamationDiamondFill } from "react-icons/bs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { ToastType } from "../../enums/toast";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DELETE_ACCOUNT_URL = "/users";

export const DeleteAccount = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation("settings");
  const toast = useToast();
  const { auth, setAuth } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    console.log("Delete account");
    try {
      const response = await axiosPrivate.delete(
        `${DELETE_ACCOUNT_URL}/${auth.user}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast?.open(t("deleteAccount.toastMessage.success"), ToastType.Success);
        setAuth({});
        setUser({});
        setShowModal(false);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setShowModal(false);
      toast?.open(t("deleteAccount.toastMessage.failure"), ToastType.Failure);
    }
  };
  return (
    <section className="md:col-span-2 flex justify-between items-center">
      <div>
        <h2 className="text-lg md:text-2xl text-indigo-500 dark:text-indigo-200 font-bold drop-shadow flex items-center gap-1 flex-wrap">
          {t("subheadings.deleteAccount")}
          <BsExclamationDiamondFill />
        </h2>
        <p className="hidden md:block text-indigo-900 dark:text-indigo-300">
          {t("deleteAccount.deleteAccountDescription")}
        </p>
      </div>
      <Button
        danger
        rounded
        small
        className="whitespace-nowrap"
        onClick={() => setShowModal(!showModal)}
      >
        {t("deleteAccount.btnText")}
      </Button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          size="!w-[95vw] h-1/2 md:!w-2/6 md:h-3/6"
          actionBar={
            <div className="flex items-center justify-center gap-2">
              <Button
                success
                rounded
                className="h-full !py-1.5"
                onClick={() => setShowModal(false)}
              >
                {t("deleteAccount.warning.buttons.cancel")}
              </Button>
              <Button
                danger
                rounded
                className="h-full !py-1.5"
                onClick={handleDeleteAccount}
              >
                {t("deleteAccount.warning.buttons.proceed")}
              </Button>
            </div>
          }
        >
          <div className="h-full">
            <h5 className="text-red-500 text-2xl font-bold mb-2 drop-shadow-sm flex items-center gap-1">
              {t("deleteAccount.warning.heading")}
              <RiDeleteBin5Fill />
            </h5>
            <div className="mx-auto h-5/6">
              <p className="bg-red-500/20 text-red-900 p-2 text-lg dark:text-red-100 rounded-md">
                {t("deleteAccount.warning.warningText")}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
