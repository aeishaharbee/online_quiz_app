import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const QuizCard = ({ categ, id }) => {
  const router = useRouter();

  return (
    <Card className="py-2">
      <CardBody className="text-center">
        <h3 className="text-xl font-semibold mb-2">{categ.name}</h3>
      </CardBody>
      <CardFooter className="flex justify-center gap-2 pt-0">
        <Button
          variant="ghost"
          color="primary"
          onPress={() => router.push(`/quiz/${id}`)}
        >
          Start
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
