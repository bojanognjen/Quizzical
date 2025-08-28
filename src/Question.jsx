import he from "he";

export default function Question({ element, index }) {
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const answers = shuffleArray([
    element.correct_answer,
    ...element.incorrect_answers,
  ]);

  return (
    <div className="question__block">
      <p className="question">{he.decode(element.question)}</p>
      <div className="answers">
        {answers.map((ans, i) => (
          <label className="answer" key={i}>
            <input type="radio" name={`answer-${index}`} value={ans} />
            {ans}
          </label>
        ))}
      </div>
    </div>
  );
}
