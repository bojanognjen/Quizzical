import { useEffect, useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import "./App.css";
import type { TriviaResponse } from "./types";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [data, setData] = useState<TriviaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [replays, setReplays] = useState(0);

  function handleReset(e: React.SyntheticEvent) {
    e.preventDefault();
    setReplays(prev => prev + 1)
    setGameStarted(false)
  }

  useEffect(() => {
    // define async function inside useEffect
    async function fetchData() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple");
        if (!response.ok) {
          setError(`HTTP error! Status: ${response.status}`);
          return;
        }
        const result = await response.json();
        setData(result); // save data in state

      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.log(error);
      }
    }

    void fetchData();
  }, [replays]); // empty deps → run only once when component mounts

  return (
    <div className="app-container">
      <div className="upper__corner"></div>
      <div className="lower__corner"></div>
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <GameScreen data={data} handleReset={handleReset} />
      )}
    </div>
  );
}
