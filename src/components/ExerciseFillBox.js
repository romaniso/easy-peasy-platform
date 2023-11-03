import React from 'react';

function ExerciseFillBox({questions, text, results, onChange}) {
    const renderWords = questions.map(({word}, index) => (
        <span key={index} className="mr-6 text-lg leading-8 font-bold text-indigo-700">
      {word}
    </span>
    ));

    const handleText = (text) => {
        return text.split('***').map((part, index, arr) => {
            let inputColor;
            if(results) {
                inputColor = results[index] === "Same" ? 'bg-green-200 font-bold' : 'bg-red-200 font-bold text-black';
            }
            return <>
                <span key={index}>{part}</span>
                {index !== arr.length - 1 && (
                    <>
                        <span
                            className='mr-1 bg-orange-400 text-white py-1 px-3 rounded-lg text-base shadow'>{index + 1}</span>

                        <input
                            className={`text-xl h-8 w-36 p-1 border rounded-md shadow-inner text-indigo-800 outline-none transition-colors duration-1000 ${inputColor}`}
                            key={index}
                            name="selection"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => onChange(index, e)}
                        />
                    </>
                )}
            </>}
        );
    };

    const renderText = handleText(text);

    return (
        <div>
            <div className="border rounded-md p-4 shadow mb-6">{renderWords}</div>
            <p className='text-xl leading-loose mb-8 text-justify'>{renderText}</p>
        </div>
    );
}

export default ExerciseFillBox;
