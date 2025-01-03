import { useMemo } from "react";
import { FaCheck, FaCaretDown } from "react-icons/fa";

// Define the types of icons available
export enum IconType {
  Check = "check",
  SelectArrow = "selectArrow",
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
        [IconType.Check, (className) => <FaCheck className={className} />],
        [
          IconType.SelectArrow,
          (className) => <FaCaretDown className={className} />,
        ],
      ]),
    []
  );

  return iconMap.get(type)?.(className) || <span>Icon not found</span>;
};
