function ExerciseFillBox({questions: words, text, results, onChange}) {
    const renderedWords = words.map(({word}, index) => {
        return <span key={index} className="mr-6 text-lg leading-8 font-bold text-indigo-700">{word}</span>
    })

    const handleText = (text) => {
        return text.split("***").map((part, index, arr) => {
            if(index !== arr.length - 1){
                return <>
                    <span key={index}>{part}</span>
                    <span className='mr-1 bg-orange-400 text-white py-1 px-3 rounded-lg text-base shadow'>{index + 1}</span>
                    <input
                        className="text-xl h-8 w-36 p-1 border rounded-md shadow-inner text-indigo-800 outline-none"
                        key={index}
                        name="selection"
                        type="text"
                        autoComplete="off"
                        onChange={(e) => onChange(index, e)}
                    />
                </>
            } else {
                return <span>{part}</span>
            }
        })
    }
    const renderedText = handleText(text);

    return (
        <div>
            <div className="border rounded-md p-4 shadow mb-6">{renderedWords}</div>
            <p className='text-xl leading-loose mb-8 text-justify'>{renderedText}</p>
        </div>
    )
}

export default ExerciseFillBox;