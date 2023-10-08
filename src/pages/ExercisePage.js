import { useParams } from "react-router-dom";
import Exercise from "../components/Exercise";
import Cheetsheet from "../components/Cheetsheet";
import Panel from "../components/Panel";
//TODO: Here I will probably implement API request for data base where I get all content for cheetsheet md, exercises, instructions, etc based on path of URL and then send it to the Exercise component. Maybe I will create ExerciseSet component as well

function ExercisePage() {
  const { topic } = useParams();
  //TODO: to be fetched from API/server
  const data = {
    instruction:
      "Choose the correct or most appropriate future forms to complete the sentences below.",
    title: "Will / be going to / present continuous for future",
    type: "dropdown",
    questions: [
      {
        question: "I *** visit my grandmother tomorrow.",
        options: [
          { text: "will", isCorrect: false },
          { text: "am going to", isCorrect: true },
          { text: "am visiting", isCorrect: false },
        ],
      },
      {
        question:
          "They have tickets for the concert. They *** attend it tonight.",
        options: [
          { text: "will", isCorrect: false },
          { text: "are going to", isCorrect: true },
          { text: "are attending", isCorrect: false },
        ],
      },
      {
        question: "I think it *** rain later, so don't forget your umbrella.",
        options: [
          { text: "will", isCorrect: true },
          { text: "is going to", isCorrect: false },
          { text: "is raining", isCorrect: false },
        ],
      },
      {
        question: "She *** fly to Paris next week for a business meeting.",
        options: [
          { text: "will", isCorrect: false },
          { text: "is going to", isCorrect: true },
          { text: "is flying", isCorrect: false },
        ],
      },
      {
        question:
          "We *** have a picnic at the park on Saturday if the weather is nice.",
        options: [
          { text: "will", isCorrect: false },
          { text: "are going to", isCorrect: true },
          { text: "are having", isCorrect: false },
        ],
      },
    ],
  };
  const { instruction, title, type, questions } = data;
  const cheetsheet = {
    topic: "Future Tenses",
    level: "B1",
    content: `
      <article>
         <h3>Will / Be going to / Present Continuous for future</h3>
         <p>What tenses should I use to talk about future? Future simple or be going to or, maybe, present continuous will be enough? All! But it depends what you wanna say! Let break it down and see the difference.</p>
      </article>
      `,
  };
  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
        {topic}
      </h1>
      <Panel className="bg-white flex h-screen">
        <Exercise
          title={title}
          type={type}
          instruction={instruction}
          questions={questions}
        />
        <Cheetsheet
          topic={cheetsheet.topic}
          level={cheetsheet.level}
          content={cheetsheet.content}
        />
      </Panel>
    </div>
  );
}

export default ExercisePage;
