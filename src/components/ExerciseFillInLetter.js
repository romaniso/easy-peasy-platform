import {useEffect, useRef, useState} from "react";
import FillInLetterUnit from "./FillInLetterUnit";

function ExerciseFillInLetter({ questions, onChange, results }) {
    const [insertedWords, setInsertedWords] = useState([]);
    const handleChange = ({target}, wordIndex, charIndex) => {
        //updating insertedWords array
        const {value} = target;
        const newWord = [...insertedWords[wordIndex]];
        newWord[charIndex] = value.substring(value.length - 1);
        const updatedInsertedWords = insertedWords;
        updatedInsertedWords[wordIndex] = newWord;
        setInsertedWords(updatedInsertedWords);

        console.log(insertedWords[wordIndex]);
    }

    const randomizeIndex = (max) => Math.floor(Math.random() * max);
    const handleWord = (word, index) => {
        const arrWord = word.split("");
        const visibleCount = Math.floor(arrWord.length / 2);
        const randomIndexes = new Set();

        while (randomIndexes.size < visibleCount) {
            const randomIndex = randomizeIndex(arrWord.length);
            if (arrWord[randomIndex] !== " ") {
                randomIndexes.add(randomIndex);
            }
        }
        const newWord = [...arrWord];
        arrWord.map((char, index) => {
            if (randomIndexes.has(index)) {
                newWord[index] = "*";
            } else if (char === " ") {
                newWord[index] = " ";
            } else {
                newWord[index] = char;
            }
        });
        const updatedArr = insertedWords;
        insertedWords[index] = newWord;
        setInsertedWords(updatedArr);
    };

    useEffect(() => {
        questions.map((word, index) => handleWord(word, index));
    }, []);

    const renderedExercise = insertedWords.map((word, wordIndex) => (
        <FillInLetterUnit word={word} wordIndex={wordIndex} onFill={handleChange} insertedWord={insertedWords[wordIndex]}/>
      //   <div key={wordIndex}>
      // <span className="mr-2 md:mr-4 bg-indigo-400 text-white py-[2px] md:py-1 px-2 md:px-2 rounded-lg text-sm md:text-base shadow">
      //   {wordIndex + 1}
      // </span>
      //       <div className="inline-flex items-center gap-1 mb-6 md:mb-8">
      //           {word.map((char, charIndex) => {
      //               if (word[charIndex] === "*") {
      //                   return (
      //                       <input
      //                           //check if this is an active input
      //                           ref={wordIndex === activeInputIndexArr[0] && charIndex === activeInputIndexArr[1] ? inputRef: null}
      //                           key={charIndex}
      //                           className="text-lg md:text-xl text-center md:p-1 border rounded-md shadow-inner text-indigo-800 font-bold outline-none w-6 md:w-8 hover:scale-105 focus:border-orange-300 hover:border-orange-300 transition-all duration-500"
      //                           name="letter"
      //                           type="text"
      //                           autoComplete="off"
      //                           onChange={(e) => handleChange(e, wordIndex, charIndex)}
      //                       />
      //                   );
      //               } else if (insertedWords[wordIndex][charIndex] === " ") {
      //                   return <span key={charIndex} className="w-4 md:w-6">{char}</span>;
      //               } else {
      //                   return <span key={charIndex} className="text-indigo-900 text-lg md:text-xl">{insertedWords[wordIndex][charIndex]}</span>;
      //               }
      //           })}
      //       </div>
      //   </div>
    ));

    return <div>{renderedExercise}</div>;
}

export default ExerciseFillInLetter;
