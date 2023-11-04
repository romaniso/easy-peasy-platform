import React from 'react';

function ExerciseFillBox({questions, text, results, onChange}) {
    const handleText = (text) => {
        return text.split('***').map((part, index, arr) => {
            let inputColor;
            if(results) {
                inputColor = results[index] === "Same" ? 'bg-green-200 font-bold' : 'bg-red-200 font-bold text-black';
            }
            return <>
                <span key={index}>{part}</span>
                {index !== arr.length - 1 && (
                    <div className='inline-block'>
                        <span
                            className='mr-1 bg-orange-400 text-white py-[2px] md:py-1 px-2 md:px-3 rounded-lg text-base shadow'>{index + 1}</span>

                        <input
                            className={`text-base md:text-xl h-6 w-28 md:h-8 md:w-36 p-1 mr-1 border rounded-md shadow-inner text-indigo-800 outline-none hover:border-orange-400 transition-colors duration-700 ${inputColor}`}
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
        <span key={index} className="text-base md:text-lg leading-8 font-bold text-indigo-700 mr-6">
      {word}
    </span>
    ));
    const renderText = handleText(text);

    return (
        <div>
            <div className="border rounded-md p-2 md:p-4 shadow mb-4 md:mb-6">{renderWords}</div>
            <p className='text-base md:text-xl text-indigo-900 md:leading-loose mb-8 text-justify'>{renderText}</p>
        </div>
    );
}

export default ExerciseFillBox;
