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
         <p class="text-sm text-orange-500 bg-stone-50 shadow-inner p-3 mb-5 rounded-lg">What tenses should I use to talk about future? Future simple or be going to or, maybe, present continuous will be enough? All! But it depends what you wanna say! Let break it down and see the difference.</p>
         
         <h5 class="text-2xl font-bold text-indigo-400 mb-3">Predictions</h5>
         <p class="text-indigo-900 mb-3">We use <strong>will</strong> when we are trying to predict what will happen in the future. It is still only our subjective opinion or feeling:</p>
         <div class="text-indigo-900 mb-5 shadow-inner bg-stone-50 px-3 py-2">
            <p>I think you <strong>will</strong> learn English fast.</p>
            <p>I suppose she <strong>will</strong> be late today.</p>
            <p>I am sure we <strong>will</strong> win the match!</p>
         </div>
         <p class="text-indigo-900 mb-3">As it is shown in the previous examples, we often use the verbs such as <strong>think, believe, guess, suppose, reckon</strong> with <strong>will</strong> to predict about the future. This is only hypothetical and subjective opinion. As well we can use some adverbs of possibility with <strong>will</strong> such as <strong>maybe, perphaps, possibly</strong>:
         </p>
         <div class="text-indigo-900 mb-5 shadow-inner bg-stone-50 px-3 py-2">
            <p><strong>Maybe</strong> she <strong>will</strong> show up at the party.</p>
            <p><strong>Perhaps</strong>, people <strong>will</strong> switch from fuel cars to electic cars ultimitaly.</p>
         </div>

         <p class="text-indigo-900 mb-3">We can also use <strong>be going to</strong> for expressing our predictions but there is one big difference between <strong>will</strong> and <strong>be going to</strong>. With <strong>be going to</strong> we are predicting the event based on <span class="underline">a specific and obvious evident</span>. When we can physically see it is going to happen. For instance, we can see the dark clouds in the sky. So, based on that we can predict that it is going to rain. It is not hypothetical but highly possible:</p>
         <div class="text-indigo-900 mb-5 shadow-inner bg-stone-50 px-3 py-2">
            <p>Look at those dark clouds. It <strong>is going to</strong> rain soon.</p>
            <p>What the heck! You are driving like a maniac! Slow down, or we are going to crash!</p>
         </div>

         
         <h5 class="text-2xl font-bold text-indigo-400 mb-3">Decisions</h5>
         
         <h5 class="text-2xl font-bold text-indigo-400 mb-3">Arrangements or Plans</h5>
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
