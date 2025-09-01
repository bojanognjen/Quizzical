import Question from "./Question";
import CheckAnswers from "./CheckAnswers"
import { useState } from "react";

export default function GameScreen({ data }) {

  const [answers, setAnswers] = useState({});
  const [allAnswered, setAllAnswered] = useState(true);

//   data.results.map((question, index) => {
//   const userAnswer = answers[index];      // what user selected
//   const correctAnswer = question.correct_answer;



//   if (userAnswer === correctAnswer) {
//     console.log(`Question ${index} ✅ Correct`);
//   } else {
//     console.log(`Question ${index} ❌ Wrong. Correct answer: ${correctAnswer}`);
//   }
// });

  const handleAnswer = (id, value) => {
    setAnswers(prev => ({...prev, [id]: value}));
  }

  return (
    <form>
      {data.results.map((element, index) => (
        <Question key={index} element={element} questionId={index} setAnswers={setAnswers} />
      ))}
      <CheckAnswers setAllAnswered={setAllAnswered} answers={answers} allAnswered={allAnswered} data={data}/>
    </form>
  )
}