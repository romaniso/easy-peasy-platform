import React from 'react';

function ExerciseFillBox({questions, text, results, onChange}) {
    const handleText = (text) => {
        return text.split('***').map((part, index, arr) => {
            let inputColor;
            if(results) {
                inputColor = results[index] === "Same" ? 'bg-green-200 dark:bg-green-500/30 font-bold' : 'bg-red-200 dark:bg-red-500/30 font-bold text-black';
            }
            return <>
                <span key={index}>{part}</span>
                {index !== arr.length - 1 && (
                    <div className='inline-block'>
                        <span
                            className='mr-1 bg-orange-400 dark:bg-orange-500 text-white py-[2px] md:py-1 px-2 md:px-3 rounded-lg text-base shadow'>{index + 1}</span>

                        <input
                            className={`text-base md:text-xl h-6 w-28 md:h-8 md:w-36 p-1 mr-1 border dark:border-gray-500 dark:bg-[#323232] rounded-md shadow-inner text-indigo-800 dark:text-indigo-50 outline-none hover:border-orange-400 focus:border-orange-300 focus:dark:border-orange-500 hover:dark:border-orange-500 transition-colors duration-700 ${inputColor}`}
                            key={index}
                            name="selection"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => onChange(index, e)}
                        />
                    </div>
                )}
            </>}
        );
    };

    const renderWords = questions.map(({word}, index) => (
        <span key={index} className="text-base md:text-lg leading-8 font-bold text-indigo-700 dark:text-indigo-400 mr-6">
      {word}
    </span>
    ));
    const renderText = handleText(text);

    return (
        <div>
            <div className="border dark:border-gray-500 rounded-md p-2 md:p-4 shadow mb-4 md:mb-6">{renderWords}</div>
            <p className='text-base md:text-xl text-indigo-900 dark:text-indigo-200 md:leading-loose mb-8 text-justify'>{renderText}</p>
        </div>
    );
}

export default ExerciseFillBox;
