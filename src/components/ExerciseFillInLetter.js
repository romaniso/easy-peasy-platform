import {useEffect, useState} from "react";
import FillInLetterUnit from "./FillInLetterUnit";
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";

function ExerciseFillInLetter({ questions, onChange, results }) {
    const [insertedWords, setInsertedWords] = useState([]);
    const [coveredIndexes, setCoveredIndexes] = useState([]);
    const randomizeIndex = (max) => Math.floor(Math.random() * max);
    const handleWord = (word, index) => {
        const arrWord = word.split("");
        const visibleCount = Math.floor(arrWord.length / 2);
        const randomIndexes = new Set();

        const updatedCoveredLetterIndexes = coveredIndexes;
        const coveredLetterIndexesForUnit = new Set();

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
                coveredLetterIndexesForUnit.add(index);
            } else if (char === " ") {
                newWord[index] = " ";
            } else {
                newWord[index] = char;
            }
        });

        // Copy creation
        const updatedArr = insertedWords;
        insertedWords[index] = newWord;
        const arrCoveredIndexes = Array.from(coveredLetterIndexesForUnit).sort((a, b) => a - b);
        updatedCoveredLetterIndexes.push(arrCoveredIndexes);

        //State updates
        setInsertedWords(updatedArr);
        setCoveredIndexes(updatedCoveredLetterIndexes);
    };

    useEffect(() => {
        questions.map((word, index) => handleWord(word, index));
    }, []);
    const handleSingleWordChange = (wordIndex, updatedWord) => {
        const newInsertedWords = [...insertedWords];
        newInsertedWords[wordIndex] = updatedWord;
        setInsertedWords(newInsertedWords);
        // Notify parent about the change
        onChange(wordIndex, updatedWord);
    };

    const renderedExercise = insertedWords.map((word, wordIndex) => {
        const feedbackIcon =
        results &&
        (results[wordIndex] === "Same" ? (
            <FaRegThumbsUp className="inline-block text-green-500 ml-2" />
        ) : (
            <FaRegThumbsDown className="inline-block ml-2 text-red-400" />
        ));
        return <div className='flex items-baseline gap-2'>
            <FillInLetterUnit key={wordIndex} word={word} wordIndex={wordIndex} onFill={handleSingleWordChange} coveredIndexes={coveredIndexes[wordIndex]} results={results}/>
            {feedbackIcon}
        </div>
    });

    return <div>{renderedExercise}</div>;
}

export default ExerciseFillInLetter;