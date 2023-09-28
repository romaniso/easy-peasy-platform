import { useParams } from "react-router-dom";

function ExercisePage() {
  const { topic } = useParams();

  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
        {topic}
      </h1>
    </div>
  );
}

export default ExercisePage;
