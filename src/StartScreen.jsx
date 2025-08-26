export default function StartScreen({ onStart }) {
  return (
    <div className="start__screen">
      <h1 className="start__title">Quizzical</h1>
      <p className="starting__subtitle">First Quiz made with React</p>
      <button className="button" onClick={onStart}>Start Game</button>
    </div>
  );
}

