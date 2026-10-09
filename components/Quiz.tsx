"use client";

import { useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import { fetchTriviaQuestions } from "../api/trivia";
import type { TriviaResponse } from "../types";

export default function Quiz() {
  const [gameStarted, setGameStarted] = useState(false);
  const [data, setData] = useState<TriviaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchQuestions() {
    setError(null);
    setData(null);
    try {
      setData(await fetchTriviaQuestions());
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