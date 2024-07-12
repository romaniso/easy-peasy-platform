import { UserResult } from "../../types/userResult";
import Button from "../common/Button";

interface ExerciseActionsProps {
  checkOutTxt: string;
  answersTxt: string;
  results: UserResult[] | null;
}

export const ExerciseActions: React.FC<ExerciseActionsProps> = ({
  checkOutTxt,
  answersTxt,
  results,
}) => {
  return (
    <div className="flex gap-5 items-center">
      <Button
        primary
        rounded
        className="md:min-w-1/5 text-nowrap"
        type="submit"
      >
        {checkOutTxt}
      </Button>
      {results && (
        <Button secondary rounded className="md:min-w-1/5 text-nowrap">
          {answersTxt}
        </Button>
      )}
    </div>
  );
};
