function Flashcard({ question, isCorrect, cardImage }) {
  return (
    <article className="group h-72 w-72">
      <div className="relative h-full w-full rounded-md shadow-md shadow-black-600">
        <div className="absolute inset-0">
          <img
            src={cardImage}
            alt="card"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}

export default Flashcard;
