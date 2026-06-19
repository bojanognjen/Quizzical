import Question from "./Question";
import { useEffect, useState } from "react";
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
  const [score, setScore] = useState(0);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const allAnswered = answers.every((ans) => ans !== null);

    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
    } else {
      setChecked(true);
    }
  }

  const correctAnswers = data?.results.map(el => el.correct_answer) ?? [];

  let pseudoScore = 0;
  answers.forEach(ans => {
    if (ans !== null && correctAnswers.includes(ans)) {
      pseudoScore++;
    }
  });

  useEffect(() => {
    setScore(pseudoScore);
  }, [pseudoScore]);

  if (!data) return null;

  return (
    <form className="form" onSubmit={handleSubmit} onReset={handleReset}>
      {data.results.map((element, index) => (
        <Question key={index} checked={checked} answers={answers}
        correct_answer={element.correct_answer} element={element} questionId={index}
        setAnswers={setAnswers} setScore={setScore}/>
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!checked ?
      <button type="submit" className="check button">
        Check answers
      </button> :
      <>
      <span>You scored {score}/5 correct answers</span>
      <button type="reset" className="check button">
        Play again
      </button>
      </>
    }
    </form>
  );
}