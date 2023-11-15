import { useState, useEffect } from "react";
import AddQuestionDialog from "../components/AddQuestionDialog";
import QuestionList from "../components/QuestionList";
import { Grid } from "@mui/material";
import axios from "axios";
import { categoryMapping, reverseCategoryMapping } from "../utils/QuestionUtil";
import NavBar from "../components/NavBar";
import AuthenticationToken from "../services/AuthenticationToken";
import MultipleSelectChipCategory from "../components/SelectTopic";
import MultipleSelectChipComplexity from "../components/SelectComplexity";

const QuestionsRepo = () => {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const [questions, setQuestions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedComplexities, setSelectedComplexities] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData)
  console.log(userData.userRole)
  const userRole = userData.userRole;

  const isContainCommonElement = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === reverseCategoryMapping[arr2[j]]) {
          return true;
        }
      }
    }
    return false;
  };
  const loadQuestions = async () => {
    try {
    const questions = await axios.get(`${databaseURL}/question`, {
      headers: AuthenticationToken(),
    });
  } catch (error) {
    console.log(error)
  }

    const questionsFilteredByComplexity =
      selectedComplexities.length !== 0
        ? questions.data.filter((question) =>
            selectedComplexities.includes(question.complexity)
          )
        : questions.data;
    const questionsFilteredByCategory =
      selectedCategories.length !== 0
        ? questionsFilteredByComplexity.filter((question) =>
            isContainCommonElement(selectedCategories, question.categories)
          )
        : questionsFilteredByComplexity;

    for (let i = 0; i < questionsFilteredByCategory.length; i++) {
      let question = questionsFilteredByCategory[i];
      for (let j = 0; j < question.categories.length; j++) {
        question.categories[j] = reverseCategoryMapping[question.categories[j]];
      }
      questionsFilteredByCategory[i] = question;
    }
    setQuestions(questionsFilteredByCategory);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${databaseURL}/question/${id}`, {
      headers: AuthenticationToken(),
    });
    loadQuestions();
  };

  const handleEdit = async (id, fieldsToUpdate) => {
    await axios.patch(`${databaseURL}/question/${id}`, fieldsToUpdate, {
      headers: AuthenticationToken(),
    });
    loadQuestions();
  };

  const handleCategories = (categories) => {
    setSelectedCategories(categories);
  };

  const handleComplexities = (complexities) => {
    setSelectedComplexities(complexities);
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedCategories, selectedComplexities]);

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <h1>Question Repository</h1>
        </Grid>
        {userRole === "ADMIN" && (
          <Grid item mb={2}>
            <AddQuestionDialog
              questions={questions}
              onAddQuestion={loadQuestions}
            />
          </Grid>
        )}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item mb={2}>
            <MultipleSelectChipCategory handleCategories={handleCategories} />
          </Grid>
          <Grid item mb={2}>
            <MultipleSelectChipComplexity
              handleComplexities={handleComplexities}
            />
          </Grid>
        </Grid>
        <Grid item mb={2}>
          <QuestionList
            questions={questions}
            onDelete={handleDelete}
            onEdit={handleEdit}
            userRole={userRole}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionsRepo;
