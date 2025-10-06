import Question from "./Question";
import { useState } from "react";

export default function GameScreen({ data }) {
  console.log(data)
  const arrayLength = data.results.length
  const [answers, setAnswers] = useState(Array(arrayLength).fill(null));
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

   function handleSubmit(e) {
    e.preventDefault();

    const allAnswered = answers.every((ans) => ans !== null);

    if (!allAnswered) {
      setError("⚠️ Please answer all questions before submitting.");
    } else {
      setChecked(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {data.results.map((element, index) => (
        <Question key={index} checked={checked} answers={answers} correct_answer={element.correct_answer} element={element} questionId={index} setAnswers={setAnswers} />
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" className="check button">
        Check answers
      </button>
    </form>
  )
}