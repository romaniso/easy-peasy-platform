import { ToolTip } from "../common/ToolTip";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { ImageDropZone } from "../ImageDropZone";
import { AxiosError } from "axios";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useUser } from "../../hooks/useUser";
import { useToast } from "../../context/ToastContext";
import { ToastType } from "../../enums/toast";
import { useTranslation } from "react-i18next";
import { Icon, IconType } from "../common/icon/Icon";

const AVATAR_UPLOAD_URL = "/users/upload";

export const ProfileAvatar = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const { user, setUser } = useUser();

  const toast = useToast();
  const { t } = useTranslation("profile");

  const errRef = useRef<HTMLParagraphElement>(null);

  const validateAvatarImage = (imageFile: File) => {
    const allowedFormats = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (!allowedFormats.includes(imageFile.type)) {
      const errMessage: string = t(
        "profileAvatar.validation.validationMessage_format"
      );
      setErrMsg(errMessage);
      throw new Error(errMessage);
    }
    // Check file size
    const maxSize = 5 * 1024 * 1024; // 10 MB in bytes
    if (imageFile.size > maxSize) {
      const errMessage = t("profileAvatar.validation.validationMessage_size");
      setErrMsg(errMessage);
      throw new Error(errMessage);
    }
  };

  const handleImageDrop = async (file: File) => {
    setIsLoading(true);
    validateAvatarImage(file);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      if (user.avatar) {
        formData.append("prevAvatar", user.avatar);
      }
      formData.append("userName", user.username as string);
      const response = await axiosPrivate.post(AVATAR_UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { imagePath } = response.data;
      setUser((prev) => {
        return {
          ...prev,
          avatar: imagePath,
        };
      });
      // Optional: Show a preview of the dropped image
      setSelectedImageUrl(imagePath);
      setShowModal(false);
      setIsLoading(false);
      toast?.open(t("personalInfo.toastMessage.success"), ToastType.Success);
    } catch (err) {
      if (!(err instanceof AxiosError) || !err.response) {
        setErrMsg(t("profileAvatar.validation.validationMessage_server"));
      }
      //@TODO: handle error types message
      // else if (err.response?.status === 400) {
      //     setErrMsg('Image upload failed. Please, try again.');
      //     // setErrMsg(err.response.data.message || 'Missing Username or Password');
      // } else if (err.response?.status === 401) {
      //     setErrMsg('Image upload failed. Please, try again.');
      //     // setErrMsg(err.response.data.message || 'Unauthorized');
      // }
      else {
        setErrMsg(t("profileAvatar.validation.validationMessage_default"));
      }
      errRef.current?.focus();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset error message
    setErrMsg("");
    // setSelectedImage(null);
    setIsLoading(false);
  }, [showModal]);

  return (
    <div className="w-[80px] h-[80px] md:w-[230px] md:h-[230px] overflow-hidden rounded-full flex-shrink-0 relative shadow-md border border-indigo-200 dark:border-transparent group">
      {/*@TODO: should be fetched from user.avatar not from fetch response*/}
      <img
        src={
          user.avatar ? user.avatar : "https://avatar.iran.liara.run/public/boy"
        }
        alt=""
        className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-300"
      />
      <button
        className="absolute bottom-0 inset-x-0 h-1/4 bg-black/50 flex justify-center items-center group-hover:h-[80px] transition-all duration-300 group-hover:bg-black/70"
        onClick={() => setShowModal(!showModal)}
      >
        <ToolTip tooltip="Upload your photo">
          <Icon type={IconType.Picture} className="text-2xl text-indigo-200" />
        </ToolTip>
      </button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          size="!w-[95vw] h-1/2 md:!w-2/6 md:h-3/6"
          actionBar={
            errMsg ? (
              <div className="flex items-center gap-2">
                <Button secondary rounded onClick={() => setShowModal(false)}>
                  {t("profileAvatar.buttons.goBack")}
                </Button>
                <Button success rounded onClick={() => setErrMsg("")}>
                  {t("profileAvatar.buttons.tryAgain")}
                </Button>
              </div>
            ) : (
              <Button secondary rounded onClick={() => setShowModal(false)}>
                {t("profileAvatar.buttons.goBack")}
              </Button>
            )
          }
        >
          <div className="h-full">
            <h5 className="text-orange-500 text-xl font-bold mb-2 drop-shadow-sm">
              {t("profileAvatar.heading")}
            </h5>
            <div className="mx-auto h-5/6">
              {/*Err*/}
              <p
                ref={errRef}
                className={
                  errMsg
                    ? "h-full flex justify-center text-center items-center p-2 bg-red-500/10 dark:border dark:border-red-400 rounded p-1 text-sm font-bold text-red-500 opacity-100 transition-colors duration-500 shadow"
                    : "invisible absolute"
                }
                aria-live="assertive"
              >
                {errMsg}
              </p>
              {/*Content*/}
              {errMsg.length === 0 && (
                <ImageDropZone onImageDrop={handleImageDrop} />
              )}
            </div>
          </div>
        </Modal>
      )}
      {/*@TODO: TEMPORAL*/}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md rounded-full overflow-hidden text-white flex justify-center items-center z-50">
          Loading...
        </div>
      )}
    </div>
  );
};
