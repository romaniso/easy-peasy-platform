import { useParams } from "react-router-dom";
import Exercise from "../components/Exercise";
//TODO Here I will probably implement API request for data base where I get all content for exercises, instructions, etc based on path of URL and then send it to the Exercise component. Maybe I will create ExerciseSet component as well

function ExercisePage() {
  const { topic } = useParams();

  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
        {topic}
      </h1>
      <Exercise />
    </div>
  );
}

export default ExercisePage;
