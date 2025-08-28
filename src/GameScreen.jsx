import Question from "./Question";

export default function GameScreen({ data }) {
  console.log(data);
  return (
    <form>
      {data.results.map((element, index) => (
        <Question key={index} element={element} />
      ))}
      <button className="check button">Check answers</button>
    </form>
  )
}