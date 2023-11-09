import {useEffect, useRef, useState} from "react";
function FillInLetterUnit({wordIndex, word, onFill, insertedWord}) {
    const [activeInputIndex, setActiveInputIndex] = useState();

    const inputRef = useRef();
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
        if(e.key === "Backspace") {
            // e.preventDefault();
            onFill("*", wordIndex, inputIndex);
            let newIndex = inputIndex - 1;
            while(newIndex >= 0 && word[newIndex] !== "*") {
                console.log('Jump');
                newIndex = newIndex - 1;
            }
            setActiveInputIndex(newIndex);
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
        console.log("active index: ", activeInputIndex)

    }, [activeInputIndex]);

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
                            ref={charIndex === activeInputIndex ? inputRef: null}
                            key={charIndex}
                            className="text-lg md:text-xl text-center md:p-1 border rounded-md shadow-inner text-indigo-800 font-bold outline-none w-6 md:w-8 hover:scale-105 focus:border-orange-300 hover:border-orange-300 transition-all duration-500"
                            name="letter"
                            type="text"
                            autoComplete="off"
                            maxLength={1}
                            value={insertedWord[charIndex] !== "*" ? insertedWord[charIndex] : undefined}
                            // onKeyDown={(e) => handleOnKeyDown(e, charIndex)}
                            onChange={(e) => {
                                onFill(e, wordIndex, charIndex)
                                updateInput(charIndex)
                            }}
                            onClick={() => setActiveInputIndex(charIndex)}
                        />
                    );
                } else if (word[charIndex] === " ") {
                    return <span key={charIndex} className="w-4 md:w-6">{char}</span>;
                } else {
                    return <span key={charIndex} className="text-indigo-900 text-lg md:text-xl">{word[charIndex]}</span>;
                }
            })}
        </div>
    </div>)
}

export default FillInLetterUnit;