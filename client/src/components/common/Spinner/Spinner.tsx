import { PiSpinnerGap } from "react-icons/pi";

export enum SpinnerSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface SpinnerProps {
  size?: SpinnerSize;
}

export const Spinner = ({
  size = SpinnerSize.MEDIUM,
}: SpinnerProps): JSX.Element => {
  const sizeClass = {
    [SpinnerSize.SMALL]: "text-2xl",
    [SpinnerSize.MEDIUM]: "text-4xl",
    [SpinnerSize.LARGE]: "text-6xl",
  }[size || SpinnerSize.MEDIUM];

  return <PiSpinnerGap className={`animate-spin ${sizeClass} text-white`} />;
};
