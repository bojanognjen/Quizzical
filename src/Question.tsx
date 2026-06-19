import he from "he";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { TriviaQuestion } from "./types";

interface Props {
  element: TriviaQuestion;
  questionId: number;
  setAnswers: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  answers: (string | null)[];
  correct_answer: string;
  checked: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
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

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(
      shuffleArray([element.correct_answer, ...element.incorrect_answers])
    );
  }, []);

  const handleChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = value;
      return newAnswers;
    });
  };

  return (
    <div className="question__block">
      <p className="question">{he.decode(element.question)}</p>
      <div className="answers">
        {options.map((opt, i) => (
          <label
            className={clsx("answer", {
              correctAnswer:
                checked &&
                he.decode(opt) === element.correct_answer,
              wrongAnswer:
                checked &&
                answers[questionId] !== element.correct_answer &&
                he.decode(opt) === answers[questionId],
              endingBorders:
                checked &&
                !answers.includes(he.decode(opt)) &&
                element.correct_answer !== he.decode(opt),
              endingFontColor:
                checked &&
                he.decode(opt) !== element.correct_answer
            })}
            key={i}
          >
            <input
              type="radio"
              name={`q${questionId}`}
              value={he.decode(opt)}
              onChange={() => handleChange(questionId, he.decode(opt))}
            />
            <span>{he.decode(opt)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}