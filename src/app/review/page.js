"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReviewPage = () => {
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults"));
    if (storedResults) {
      setResults(storedResults.userAnswers);
    }
  }, []);

  if (!results.length) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="container my-10 mx-auto md:px-16 px-2 flex flex-col items-center">
      <h2 className="font-bold sm:text-4xl text-3xl mb-4 text-center">
        Review Your Answers
      </h2>

      <div className="flex gap-2">
        <Button
          color="warning"
          onPress={() => router.back()}
          className="mb-10"
          variant="ghost"
        >
          Retry
        </Button>

        <Button
          color="primary"
          onPress={() => router.push("/")}
          className="mb-10"
          variant="ghost"
        >
          Back to Home
        </Button>
      </div>

      {results.map((result, index) => (
        <div key={index} className="mb-5 max-w-4xl w-full">
          <Card
            className="mb-6"
            style={{
              border: result.isCorrect ? "3px solid green" : "3px solid red",
            }}
          >
            <CardBody className="text-center">
              <p>
                <strong>Question:</strong>
              </p>
              <p className="text-xl">{result.question}</p>

              <p className="mt-5">
                <strong>Your Answer:</strong>
              </p>
              <p
                className={`text-xl ${
                  result.isCorrect
                    ? "text-green-500 font-semibold"
                    : "text-red-500"
                }`}
              >
                {result.userAnswer}
              </p>
              {!result.isCorrect && (
                <>
                  <p className="mt-5">
                    <strong>Correct Answer:</strong>
                  </p>
                  <p className="text-xl text-green-500 font-semibold">
                    {result.correctAnswer}
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
