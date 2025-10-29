import Question from "./Question";
import { useEffect, useState } from "react";

export default function GameScreen({ data, handleReset}) {
  const arrayLength = data.results.length
  const [answers, setAnswers] = useState(Array(arrayLength).fill(null));
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

   function handleSubmit(e) {
    e.preventDefault();

    const allAnswered = answers.every((ans) => ans !== null);

    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
    } else {
      setChecked(true);
    }
  }

  let correctAnswers = data.results.map(el => el.correct_answer);

  const [score, setScore] = useState(0);

  let pseudoScore = 0;
  answers.map(ans => { 
    if(correctAnswers.includes(ans)) {
      pseudoScore++
    }
  })

  useEffect(()=> {
    setScore(pseudoScore);
  }, [pseudoScore])

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
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
  )
}