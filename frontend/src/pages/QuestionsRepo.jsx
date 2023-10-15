import { useState, useEffect } from "react";
import AddQuestionDialog from "../components/AddQuestionDialog";
import QuestionList from "../components/QuestionList";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { reverseCategoryMapping } from "../utils/QuestionUtil";
import NavBar from "../components/NavBar";

const QuestionsRepo = () => {
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
      <Grid container direction="column">
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <h1>Question Repository</h1>
        </Grid>
        <Grid item mb={2}>
          <AddQuestionDialog
            questions={questions}
            onAddQuestion={loadQuestions}
          />
        </Grid>
        <Grid item mb={2}>
          <QuestionList
            questions={questions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionsRepo;
