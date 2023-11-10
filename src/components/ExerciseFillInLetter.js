import {useEffect, useState} from "react";
import FillInLetterUnit from "./FillInLetterUnit";

function ExerciseFillInLetter({ questions, onChange, results }) {
    const [insertedWords, setInsertedWords] = useState([]);
    // const handleChange = (e, wordIndex, charIndex) => {
    //     //updating insertedWords array
    //     let value;
    //     if(e.target){
    //     value = e.target.value;
    //     } else {
    //         value = e;
    //     }
    //     const newWord = [...insertedWords[wordIndex]];
    //     newWord[charIndex] = !value? '*' : value.substring(value.length - 1);
    //     const updatedInsertedWords = insertedWords;
    //     updatedInsertedWords[wordIndex] = newWord;
    //     setInsertedWords(updatedInsertedWords);
    //
    //     if(!insertedWords[wordIndex].includes("*")){
    //         const readyWord = insertedWords[wordIndex].join("");
    //         // onChange(wordIndex, readyWord);
    //     }
    //
    //     // console.log(insertedWords[wordIndex]);
    // }

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
    const handleSingleWordChange = (wordIndex, updatedWord) => {
        const newInsertedWords = [...insertedWords];
        newInsertedWords[wordIndex] = updatedWord;
        setInsertedWords(newInsertedWords);
        // Notify parent about the change

        // console.log(insertedWords[wordIndex]);
        onChange(wordIndex, updatedWord);
    };

    const renderedExercise = insertedWords.map((word, wordIndex) => (
        <FillInLetterUnit key={wordIndex} word={word} wordIndex={wordIndex} onFill={handleSingleWordChange}/>
    ));

    return <div>{renderedExercise}</div>;
}

export default ExerciseFillInLetter;

// return <input key={charIndex} className="text-lg md:text-xl text-center md:p-1 border rounded-md shadow-inner text-indigo-800 font-bold outline-none w-6 md:w-8 hover:scale-105 focus:border-orange-300 hover:border-orange-300 transition-all duration-500" value={wordToComplete[charIndex]} data-auto-filled={true}/>;