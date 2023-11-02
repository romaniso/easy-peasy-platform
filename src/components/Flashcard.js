import { BsFillVolumeDownFill } from "react-icons/bs";
import { useState } from "react";

function Flashcard({ question, isCorrect, cardImage, example, voice, speak }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const playAudio = (e) => {
    e.stopPropagation();
    if (voice) {
      speak({ text: isCorrect, voice });
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const cardClasses = `flex-grow flip-card ${
    isFlipped ? "flipped" : ""
  } min-w-[250px] min-h-[250px] cursor-pointer hover:scale-105 transition-all duration-700`;

  return (
    <div className={cardClasses} onClick={flipCard}>
      <div className="flip-card-inner shadow-md rounded-md border">
        <div className="flip-card-front text-center flex flex-col justify-between items-center">
          <div className="h-1/2 flex justify-center items-center">
            <p className="px-2 py-4 text-indigo-800 font-bold">{question}</p>
          </div>
          <div className="w-full bg-indigo-500 h-1/2 flex justify-center items-center rounded-b-md">
            <p className="px-2 py-4 text-white">{example}</p>
          </div>
        </div>
        <div className="flip-card-back flex flex-col items-center">
          <div className="p-1 overflow-hidden">
            <img src={cardImage} alt="" className="object-cover" />
          </div>
          <div className="basis-2/3 p-2 w-full flex flex-col justify-around items-start text-left">
            <div
              className="flex items-center cursor-pointer hover:opacity-50 transition-all"
              onClick={playAudio}
            >
              <p className="text-base md:text-lg text-indigo-700  font-bold drop-shadow-md">
                {isCorrect}
              </p>
              <BsFillVolumeDownFill className="text-orange-500 ml-1 text-lg" />
            </div>
            <div>
              <p className="mb-2">{question}</p>
              <p className="text-sm italic text-indigo-500">{example}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
