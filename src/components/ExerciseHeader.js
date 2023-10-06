function ExerciseHeader({ title, instruction }) {
  return (
    <header>
      <h2 className="text-3xl font-bold text-indigo-800 mb-8">{title}</h2>
      <p className="text-2xl font-bold text-indigo-400 mb-4">
        Task Description
      </p>
      <p className="text-base text-orange-500 bg-stone-50 shadow-inner p-5 mb-4 rounded-lg">
        {instruction}
      </p>
    </header>
  );
}

export default ExerciseHeader;
