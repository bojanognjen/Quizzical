import Question from "./Question";
import { useState } from "react";
import type { TriviaResponse } from "./types";

interface Props {
  data: TriviaResponse | null;
  handleReset: (e: React.SyntheticEvent) => void;
}

export default function GameScreen({ data, handleReset }: Props) {
  const arrayLength = data?.results.length ?? 0;
  const [answers, setAnswers] = useState<(string | null)[]>(Array(arrayLength).fill(null));
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const allAnswered = answers.every((ans) => ans !== null);

    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
    } else {
      setError("");
      setChecked(true);
    }
  }

  if (!data) return null;

  // compare each answer with the correct answer of its own question
  const score = answers.filter(
    (ans, i) => ans === data.results[i]?.correct_answer
  ).length;

  return (
    <form className="form" onSubmit={handleSubmit} onReset={handleReset}>
      {data.results.map((element, index) => (
        <Question key={index} checked={checked} answers={answers}
        element={element} questionId={index} setAnswers={setAnswers}/>
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!checked ?
      <button type="submit" className="check button">
        Check answers
      </button> :
      <>
      <span>You scored {score}/{data.results.length} correct answers</span>
      <button type="reset" className="check button">
        Play again
      </button>
      </>
    }
    </form>
  );
}