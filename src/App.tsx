import { useState } from "react";
import he from "he";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import "./App.css";
import type { TriviaResponse } from "./types";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [data, setData] = useState<TriviaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchQuestions() {
    setError(null);
    setData(null);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple");
      if (!response.ok) {
        setError(`HTTP error! Status: ${response.status}`);
        return;
      }
      const result: TriviaResponse = await response.json();
      // the API sends HTML entities (&quot; &#039; ...) — decode once here so
      // every comparison in the app works on plain text
      setData({
        ...result,
        results: result.results.map(q => ({
          ...q,
          question: he.decode(q.question),
          correct_answer: he.decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(a => he.decode(a)),
        })),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.log(message);
    }
  }

  function handleStart() {
    setGameStarted(true);
    void fetchQuestions();
  }

  function handleReset(e: React.SyntheticEvent) {
    e.preventDefault();
    setGameStarted(false);
  }

  return (
    <div className="app-container">
      <div className="upper__corner"></div>
      <div className="lower__corner"></div>
      {!gameStarted ? (
        <StartScreen onStart={handleStart} />
      ) : error ? (
        <div>
          <p style={{ color: "red" }}>Could not load questions: {error}</p>
          <button type="button" className="check button" onClick={() => void fetchQuestions()}>
            Try again
          </button>
        </div>
      ) : !data ? (
        <p>Loading questions...</p>
      ) : (
        <GameScreen data={data} handleReset={handleReset} />
      )}
    </div>
  );
}