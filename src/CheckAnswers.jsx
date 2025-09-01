export default function CheckAnswers({ allAnswered, answers, setAllAnswered }) {
  function handleChecking(e) {
    e.preventDefault();
    answers.length < 5 && setAllAnswered(false)
  }

  console.log(allAnswered);
  return (
    <>
      {!allAnswered && (
        <p className="alert">Please answer all required questions.</p>
      )}
      <button className="check button" onClick={handleChecking}>
        Check answers
      </button>
    </>
  );
}
