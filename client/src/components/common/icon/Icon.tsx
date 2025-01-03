import { useMemo } from "react";
import { CiLogin } from "react-icons/ci";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

// Define the types of icons available
export enum IconType {
  Login = "login",
  Tick = "tick",
  Cross = "cross",
  Exclamation = "exclamation",
  Reset = "reset",
}

// Interface for component props
interface IconProps {
  className?: string;
  type: IconType;
}

// Icon component
/**
 * The Icon component renders a specific icon based on the provided type.
 * If the icon type is not found, it returns a <span> with the text "Icon not found".
 *
 * @param {IconProps} props - The props for the component.
 * @param {string} [props.className] - Optional className to apply to the icon.
 * @param {IconType} props.type - The type of the icon to render.
 * @returns {JSX.Element} The rendered icon or a <span> with the text "Icon not found".
 */
export const Icon = ({ className, type }: IconProps): JSX.Element => {
  const iconMap = useMemo(
    () =>
      new Map<IconType, (className?: string) => JSX.Element>([
        [IconType.Login, (className) => <CiLogin className={className} />],
        [IconType.Tick, (className) => <FaCheck className={className} />],
        [IconType.Cross, (className) => <FaTimes className={className} />],
        [
          IconType.Exclamation,
          (className) => (
            <IoIosInformationCircleOutline className={className} />
          ),
        ],
        [IconType.Reset, (className) => <GrPowerReset className={className} />],
      ]),
    []
  );

  return iconMap.get(type)?.(className) || <span>Icon not found</span>;
};
