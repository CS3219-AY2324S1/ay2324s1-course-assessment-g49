import { useState, useRef, useEffect } from "react";
import QuestionList from "./QuestionList";
import "./App.css";
import Box from "@mui/material/Box";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddQuestionDialog from "./AddQuestionDialog";
import Theme from "./themes/Theme";

function App() {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  /**
   * { id: 1, title: "question 1", category: "cat1", complexity: "easy", description: "aaa" },
   * { id: 2, title: "question 2", category: "cat2", complexity: "easy", description: "bbb" },
   */

  const loadQuestions = async () => {
    const questions = await axios.get("http://localhost:8080/question");
    setQuestions(questions.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/question/${id}`);
    loadQuestions();
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <>
      <Theme>
        <h1>Peerprep</h1>
        <Box direction="column">
          <Box mb={2}>
            <AddQuestionDialog onAddQuestion={loadQuestions} />
          </Box>
          <Box mb={2}>
            <QuestionList questions={questions} onDelete={handleDelete} />
          </Box>
        </Box>
      </Theme>
    </>
  );
}

export default App;
