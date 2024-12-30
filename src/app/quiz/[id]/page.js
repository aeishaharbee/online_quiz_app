"use client";

import { useEffect, useState } from "react";
import { fetchQuizzesFiltered } from "@/api/fetchApi";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "@nextui-org/react";

const QuizPage = ({ params }) => {
  const router = useRouter();
  const [quizId, setQuizID] = useState("");

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    async function fetchQuizData() {
      const { id } = await params;
      setQuizID(id);

      const fetchedQuestions = await fetchQuizzesFiltered({ id });
      setQuestions(fetchedQuestions);
    }

    fetchQuizData();
  }, [params]);

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;

    const updatedAnswers = [
      ...userAnswers,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer: answer,
        correctAnswer: questions[currentQuestionIndex].correct_answer,
        isCorrect,
      },
    ];

    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      localStorage.setItem(
        "quizResults",
        JSON.stringify({
          score: score + (isCorrect ? 1 : 0),
          userAnswers: updatedAnswers,
        })
      );
    }
  };

  if (quizFinished) {
    return (
      <div className="container my-10 mx-auto md:px-16 px-2 text-center">
        <h2 className="font-bold sm:text-4xl text-3xl mb-4">Quiz Finished</h2>
        <p>Your Score:</p>
        <h1 className="font-bold sm:text-7xl text-6xl my-10">
          {score} / {questions.length}
        </h1>

        <div className="flex gap-3 justify-center">
          <Button
            onPress={() => router.push("/review")}
            color="primary"
            variant="ghost"
          >
            Review Answers
          </Button>
          <Button
            onPress={() => window.location.reload()}
            color="warning"
            variant="ghost"
          >
            Retry
          </Button>
          <Button
            onPress={() => router.push("/")}
            color="danger"
            variant="ghost"
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    );
  }

  if (!questions.length) return <p className="text-center py-6">Loading...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="container my-10 mx-auto md:px-16 px-2 flex flex-col items-center gap-5">
      <h2 className="font-bold sm:text-4xl text-2xl">
        {currentQuestion.category}
      </h2>
      <p>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>

      <div className="flex justify-center max-w-4xl w-full">
        <Card className="sm:p-5">
          <CardBody>
            <p className="sm:text-2xl text-lg text-center mb-8">
              {currentQuestion.question}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {answers.map((answer, index) => (
                <Card
                  isPressable
                  isHoverable
                  key={index}
                  onPress={() => handleAnswer(answer)}
                  className="min-w-20"
                >
                  <CardBody className="text-center">{answer}</CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
