import { useMemo } from "react";
import { CiLogin } from "react-icons/ci";
import {
  FaCloudDownloadAlt,
  FaPlus,
  FaMinus,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { MdZoomOutMap } from "react-icons/md";
import { IconBaseProps } from "react-icons";

// Define the types of icons available
export enum IconType {
  Login = "login",
  Tick = "tick",
  Cross = "cross",
  Exclamation = "exclamation",
  Reset = "reset",
  Expand = "expand",
  Plus = "plus",
  Minus = "minus",
  Download = "download",
}

// Interface for component props
interface IconProps extends IconBaseProps {
  className?: string;
  type: IconType;
}

// Icon component
/**
 * The Icon component renders a specific icon based on the provided type.
 * If the icon type is not found, it returns a <span> with the text "Icon not found".
 *
 * @param {IconProps} props - The props for the component such as callback event handlers.
 * @param {string} [props.className] - Optional className to apply to the icon.
 * @param {IconType} props.type - The type of the icon to render.
 * @returns {JSX.Element} The rendered icon or a <span> with the text "Icon not found".
 */
export const Icon = ({ className, type, ...props }: IconProps): JSX.Element => {
  const iconMap = useMemo(
    () =>
      new Map<IconType, (props: IconBaseProps) => JSX.Element>([
        [IconType.Login, (props) => <CiLogin {...props} />],
        [IconType.Tick, (props) => <FaCheck {...props} />],
        [IconType.Cross, (props) => <FaTimes {...props} />],
        [
          IconType.Exclamation,
          (props) => <IoIosInformationCircleOutline {...props} />,
        ],
        [IconType.Reset, (props) => <GrPowerReset {...props} />],
        [IconType.Expand, (props) => <MdZoomOutMap {...props} />],
        [IconType.Minus, (props) => <FaMinus {...props} />],
        [IconType.Plus, (props) => <FaPlus {...props} />],
        [IconType.Download, (props) => <FaCloudDownloadAlt {...props} />],
      ]),
    []
  );

  const IconComponent = iconMap.get(type);

  return IconComponent ? (
    <IconComponent className={className} {...props} />
  ) : (
    <span>Icon not found</span>
  );
};
