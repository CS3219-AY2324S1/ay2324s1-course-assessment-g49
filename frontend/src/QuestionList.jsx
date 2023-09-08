import Question from "./Question";
import { useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([
    { id: 1, title: "question 1", complexity: "easy", description: "aaa" },
    { id: 2, title: "question 2", complexity: "easy", description: "bbb" },
  ]);
  return (
    <div>
      <ul>
        {questions.map((question) => {
          return <Question question={question} />;
        })}
      </ul>
    </div>
  );
}

export default QuestionList;
