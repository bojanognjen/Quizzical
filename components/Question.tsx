import { useState } from "react";
import clsx from "clsx";
import type { TriviaQuestion } from "../types";

interface Props {
  element: TriviaQuestion;
  questionId: number;
  setAnswers: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  answers: (string | null)[];
  checked: boolean;
}

export default function Question({
  element,
  questionId,
  setAnswers,
  answers,
  checked,
}: Props) {
  function shuffleArray(array: string[]): string[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
  }

  // shuffle once when the question mounts
  const [options] = useState(() =>
    shuffleArray([element.correct_answer, ...element.incorrect_answers])
  );

  const handleChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = value;
      return newAnswers;
    });
  };

  const selected = answers[questionId];

  return (
    <div className="question__block">
      <p className="question">{element.question}</p>
      <div className="answers">
        {options.map((opt, i) => (
          <label
            className={clsx("answer", {
              correctAnswer:
                checked &&
                opt === element.correct_answer,
              wrongAnswer:
                checked &&
                selected !== element.correct_answer &&
                opt === selected,
              endingBorders:
                checked &&
                opt !== selected &&
                opt !== element.correct_answer,
              endingFontColor:
                checked &&
                opt !== element.correct_answer
            })}
            key={i}
          >
            <input
              type="radio"
              name={`q${questionId}`}
              value={opt}
              disabled={checked}
              onChange={() => handleChange(questionId, opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}