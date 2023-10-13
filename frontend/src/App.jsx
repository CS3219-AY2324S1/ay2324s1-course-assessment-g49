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

  var reverseCategoryDict = {
    "STRINGS": "Strings",
    "ALGORITHMS": "Algorithms",
    "DATA_STRUCTURES": "Data Structures",
    "BIT_MANIPULATION": "Bit Manipulation",
    "RECURSION": "Recursion",
    "DATABASES": "Databases",
    "BRAINTEASER": "Brainteaser"
  }

  const loadQuestions = async () => {
    const questions = await axios.get("http://localhost:8080/question");
    for (let i = 0; i < questions.data.length; i++) {
      let question = questions.data[i]
      for (let j = 0; j < question.categories.length; j++) {
        question.categories[j] = reverseCategoryDict[question.categories[j]]
      }
    }  
    setQuestions(questions.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/question/${id}`);
    loadQuestions();
  };

  const handleEdit = async (id, fieldsToUpdate) => {
    await axios.patch(`http://localhost:8080/question/${id}`, fieldsToUpdate);
    loadQuestions();
  }

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
            <QuestionList questions={questions} onDelete={handleDelete} onEdit={handleEdit}/>
          </Box>
        </Box>
      </Theme>
    </>
  );
}

export default App;
