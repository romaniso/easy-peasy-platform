import {useEffect, useRef, useState} from "react";
function FillInLetterUnit({wordIndex, word, onFill}) {
    const [activeInputIndex, setActiveInputIndex] = useState();
    const [wordToComplete, setWord] = useState(word);

    const inputRefs = useRef([]);

    const handleChange = ({target}, charIndex) => {
        const {value} = target;
        const newWord = [...wordToComplete];
        newWord[charIndex] = !value? '*' : value.substring(value.length - 1);
        setWord(newWord);
    }

    useEffect(() => {
        if (activeInputIndex !== undefined) {
            inputRefs.current[activeInputIndex]?.focus();
        }
        if(!wordToComplete.includes("*")){
            onFill(wordIndex, wordToComplete);
        }
    }, [activeInputIndex, wordToComplete]);
    const updateInput = (inputIndex) => {
        if(inputIndex === word.length - 1) return;
        let newIndex = inputIndex + 1;
        if(word[newIndex] !== "*" || word[newIndex] === " "){
            updateInput(newIndex);
        } else {
            setActiveInputIndex(newIndex);
        }
    }

    const handleOnKeyDown = (e, inputIndex) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            let newIndex = inputIndex - 1;
            while (newIndex >= 0 && word[newIndex] !== "*") {
                newIndex = newIndex - 1;
            }
            const updatedWordWithRemovedChar = [...wordToComplete];
            updatedWordWithRemovedChar[inputIndex] = "*"
            setWord(updatedWordWithRemovedChar);
            setActiveInputIndex(newIndex);
        }
    };

    return ( <div key={wordIndex}>
      <span className="mr-2 md:mr-4 bg-indigo-400 text-white py-[2px] md:py-1 px-2 md:px-2 rounded-lg text-sm md:text-base shadow">
        {wordIndex + 1}
      </span>
        <div className="inline-flex items-center gap-1 mb-6 md:mb-8">
            {word.map((char, charIndex) => {
                if (word[charIndex] === "*") {
                    return (
                        <input
                            //check if this is an active input
                            ref={(el) => (inputRefs.current[charIndex] = el)}
                            key={charIndex}
                            className="text-lg md:text-xl text-center md:p-1 border rounded-md shadow-inner text-indigo-800 font-bold outline-none w-6 md:w-8 hover:scale-105 focus:border-orange-300 hover:border-orange-300 transition-all duration-500"
                            name="letter"
                            type="text"
                            autoComplete="off"
                            maxLength={1}
                            value={wordToComplete[charIndex] !== "*" ? wordToComplete[charIndex] : ""}
                            onKeyDown={(e) => handleOnKeyDown(e, charIndex)}
                            onChange={(e) => {
                                updateInput(charIndex)
                                handleChange(e, charIndex)
                            }}
                            onClick={() => setActiveInputIndex(charIndex)}
                        />
                    );
                } else if (word[charIndex] === " ") {
                    return <span key={charIndex} className="w-4 md:w-6">{char}</span>;
                // } else if(!word[charIndex].isAutoCompleted) {
                //     return <span key={charIndex} className="text-indigo-900 text-lg md:text-xl">{word[charIndex]}</span>;
                } else {
                    return <span key={charIndex} className="text-indigo-900 text-lg md:text-xl">{word[charIndex]}</span>;
                }
            })}
        </div>
    </div>)
}

export default FillInLetterUnit;