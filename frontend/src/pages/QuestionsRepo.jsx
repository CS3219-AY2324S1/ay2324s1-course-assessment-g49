import { useState, useEffect } from 'react';
import AddQuestionDialog from '../components/AddQuestionDialog';
import QuestionList from '../components/QuestionList';
import { Box } from '@mui/material';
import axios from 'axios';
import { reverseCategoryMapping } from '../utils/QuestionUtil';

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
        <h1>Question Repository</h1>
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
    </>
  );
};

export default QuestionsRepo;
