import { PiSpinnerGap } from "react-icons/pi";

export enum SpinnerSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface SpinnerProps {
  size: SpinnerSize;
}

export const Spinner = ({
  size = SpinnerSize.MEDIUM,
}: SpinnerProps): JSX.Element => {
  return <PiSpinnerGap className={`animate-spin text-2xl`} />;
};
