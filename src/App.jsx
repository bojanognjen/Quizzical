import { useEffect, useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import "./App.css";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // define async function inside useEffect
    async function fetchData() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // save data in state

      } catch (err) {
        setError(err.message); 
        console.log(error);// save error message
      }
    }

    fetchData();
  }, []); // empty deps → run only once when component mounts

  return (
    <div className="app-container">
      <div className="upper__corner"></div>
      <div className="lower__corner"></div>
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <GameScreen data={ data }/>
      )}
    </div>
  );
}
