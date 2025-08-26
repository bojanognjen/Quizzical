export default function GameScreen({ data }) {
  return (
    <div>
      {data.results.map((element, index) => (
        <p key={index}>{element.question}</p>
      ))}
    </div>
  );
}