import {useEffect, useState} from "react";
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

        if(!insertedWords[wordIndex].includes("*")){
            const readyWord = insertedWords[wordIndex].join("");
            onChange(wordIndex, readyWord);
        }
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
        <FillInLetterUnit key={wordIndex} word={word} wordIndex={wordIndex} onFill={handleChange} insertedWord={insertedWords[wordIndex]}/>
    ));

    return <div>{renderedExercise}</div>;
}

export default ExerciseFillInLetter;
