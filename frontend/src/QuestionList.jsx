import Question from "./Question";
import { useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([
    { id: 1, title: "question 1", complexity: "easy", description: "aaa" },
    { id: 2, title: "question 2", complexity: "easy", description: "bbb" },
  ]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Question No.</th>
            <th>Question Title</th>
            <th>Question Complexity</th>
            <th>Question Description</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => {
            return <Question question={question} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionList;
