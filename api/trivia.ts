import he from "he";
import type { TriviaResponse } from "../types";

const API_URL = "https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple";

export async function fetchTriviaQuestions(): Promise<TriviaResponse> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result: TriviaResponse = await response.json();
  // the API sends HTML entities (&quot; &#039; ...) — decode once here so
  // every comparison in the app works on plain text
  return {
    ...result,
    results: result.results.map(q => ({
      ...q,
      question: he.decode(q.question),
      correct_answer: he.decode(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(a => he.decode(a)),
    })),
  };
}