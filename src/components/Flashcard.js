function Flashcard({ question, isCorrect, cardImage }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={cardImage} alt="Avatar" />
          <p>{isCorrect}</p>
        </div>
        <div className="flip-card-back">
          <p>{question}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
