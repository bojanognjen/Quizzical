import he from "he";
import { useEffect, useState } from "react";

export default function Question({ element, index, questionId, setAnswers }) {
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

const [options, setOptions] = useState([]);

useEffect(() => {
  setOptions(shuffleArray([element.correct_answer, ...element.incorrect_answers]));
}, []);


  const handleChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value, // save selected answer for this question
    }));
  };

  return (
    <div key={index} className="question__block">
      <p className="question">{he.decode(element.question)}</p>
      <div className="answers">
        {options.map((opt, i) => (
          <label className="answer" key={i}>
            <input
              type="radio"
              name={`q${questionId}`}
              value={he.decode(opt)}
              onChange={()=> handleChange(he.decode(opt))}
            />
            <span>{he.decode(opt)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
