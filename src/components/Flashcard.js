function Flashcard({ question, isCorrect, cardImage }) {
    return (
        <article className="group h-72 w-72 [perspective:1000px]">
            <div className="relative h-full w-full rounded-md shadow-md shadow-black-600 overflow-hidden transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 [backface-visibility: hidden]">
                    <img
                        src={cardImage}
                        alt="card"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 text-center flex justify-center items-center bg-black/70">
                        <p className="text-indigo-50 drop-shadow">{question}</p>
                    </div>
                </div>
                <div className="absolute w-full h-full inset-0 bg-black [transform:rotateY(180deg)] [backface-visibility: hidden]">
                    <p className="text-indigo-50 drop-shadow">{isCorrect}</p>
                </div>
            </div>
        </article>
    );
}

export default Flashcard;
