import axios from "axios";
import he from "he";

let quizCache = {};

export const fetchQuizzesFiltered = async ({ id }) => {
  const maxRetries = 3;
  let attempt = 0;
  let delay = 1000;

  while (attempt < maxRetries) {
    try {
      if (quizCache[id]) return quizCache[id];

      const res = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`
      );

      const processedData = res.data.results.map((quiz) => ({
        ...quiz,
        category: he.decode(quiz.category),
        question: he.decode(quiz.question),
        correct_answer: he.decode(quiz.correct_answer),
        incorrect_answers: quiz.incorrect_answers.map((answer) =>
          he.decode(answer)
        ),
      }));

      quizCache[id] = processedData;
      return processedData;
    } catch (err) {
      if (err.response?.status === 429) {
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw err;
      }
    }
  }

  throw new Error("Failed to fetch quizzes after retries");
};

export const fetchCategories = async () => {
  const res = await axios.get("https://opentdb.com/api_category.php");
  return res.data.trivia_categories.map((category) => ({
    ...category,
    name: he.decode(category.name),
  }));
};
