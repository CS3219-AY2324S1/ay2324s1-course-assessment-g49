import { useState, useEffect } from "react";
import QuestionList from "./components/QuestionList";
import "./App.css";
import Box from "@mui/material/Box";
import axios from "axios";
import AddQuestionDialog from "./components/AddQuestionDialog";
import Theme from "./themes/Theme";
import { reverseCategoryMapping } from "./utils/QuestionUtil";

function App() {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const [questions, setQuestions] = useState([]);
  const loadQuestions = async () => {
    const questions = await axios.get(`${databaseURL}/question`);
    for (let i = 0; i < questions.data.length; i++) {
      let question = questions.data[i];
      for (let j = 0; j < question.categories.length; j++) {
        question.categories[j] = reverseCategoryMapping[question.categories[j]];
      }
    }
    setQuestions(questions.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${databaseURL}/question/${id}`);
    loadQuestions();
  };

  const handleEdit = async (id, fieldsToUpdate) => {
    await axios.patch(`${databaseURL}/question/${id}`, fieldsToUpdate);
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
            <AddQuestionDialog
              questions={questions}
              onAddQuestion={loadQuestions}
            />
          </Box>
          <Box mb={2}>
            <QuestionList
              questions={questions}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Box>
        </Box>
      </Theme>
    </>
  );
}

export default App;
