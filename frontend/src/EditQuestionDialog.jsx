import { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  Stack,
  MenuItem,
  Box,
} from "@mui/material";
import CustomSnackbar from "./CustomSnackbar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import EditIcon from "@mui/icons-material/Edit";

function EditQuestionDialog({ question, onEdit }) {
  //   const storedQuestions = JSON.parse(localStorage.getItem("questions"));
  //   const questions = storedQuestions !== null ? storedQuestions : [];
  const [questions, setQuestions] = useState([]);

  const inputRefs = {
    title: useRef(null),
    categories: useRef(null),
    complexity: useRef(null),
    description: useRef(null),
  };

  const [questionData, setQuestionData] = useState({
    title: "",
    categories: "",
    complexity: "",
    description: "",
  });

  const [oldQuestionData, setOldQuestionData] = useState({ ...questionData });

  const complexityLevels = ["EASY", "MEDIUM", "HARD"];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    fetchData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState("");

//   const handleDuplicateQuestion = () => {
//     setsnackbarMessage("Duplicate question detected!");
//     setSnackbarOpen(true);
//   };

  const handleEmptyInputField = () => {
    setsnackbarMessage("Missing fields detected!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setQuestionData((prevQuestionData) => ({
      ...prevQuestionData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setQuestionData((prevQuestionData) => ({
      ...prevQuestionData,
      description: value,
    }));
  };

  const handleError = (message) => {
    setsnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const title = inputRefs.title.current.value;
    const complexity = inputRefs.complexity.current.value;
    const categories = inputRefs.categories.current.value.split(", ");
    const description = inputRefs.description.current.value;
    const descriptionClean = description.replace(/<(?!img)[^>]*>/g, "").trim();
    // const isDuplicateQuestion =
    //   questions !== null &&
    //   questions.some((question) => question.title === title);

    const isInputFieldEmpty =
      !title || !complexity || !categories || descriptionClean.length == 0;

    // if (isDuplicateQuestion) {
    //   handleDuplicateQuestion();
    // } else
    if (isInputFieldEmpty) {
      handleEmptyInputField();
    } else {
      try {
        const fieldsToUpdate = Object.keys(questionData).reduce((acc, key) => {
          
          if (oldQuestionData[key] !== questionData[key]) {
            acc[key] = questionData[key];
          }
          return acc;
        }, {});
        onEdit(question.id, fieldsToUpdate);
        if (Object.keys(fieldsToUpdate).length > 0) {
          setOldQuestionData(fieldsToUpdate);
        }
        handleClose();
      } catch (error) {
        handleError(error.response.data);
        console.error("Error updating question data", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/question/${question.id}`
      );
      setQuestionData(response.data);
      setOldQuestionData(response.data);
      const storedQuestions = await axios.get(`http://localhost:8080/question`);
      setQuestions(storedQuestions.data);
    } catch (error) {
      console.error("Error fetching question data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <Box direction="column">
            <Box mb={2}>
              <DialogContentText>
                To edit a new question, please change the fields accordingly.
              </DialogContentText>
            </Box>

            <form
              onSubmit={(evt) => {
                handleSubmit(evt);
              }}
            >
              <Stack spacing={2}>
                <TextField
                  className="textField same-width-textfield"
                  name="title"
                  label="Question Title"
                  value={questionData.title}
                  variant="filled"
                  onChange={handleFieldChange}
                  type="text"
                  inputRef={inputRefs.title}
                ></TextField>
                <TextField
                  className="textField same-width-textfield"
                  name="categories"
                  label="Question Category"
                  value={questionData.categories}
                  onChange={handleFieldChange}
                  variant="filled"
                  inputRef={inputRefs.categories}
                ></TextField>
                <TextField
                  select
                  name="complexity"
                  label="Question Complexity"
                  value={questionData.complexity}
                  onChange={handleFieldChange}
                  variant="filled"
                  inputRef={inputRefs.complexity}
                  className="textField same-width-textfield"
                >
                  {complexityLevels.map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <DialogContentText>Question Description</DialogContentText>
                <ReactQuill
                  ref={inputRefs.description}
                  theme="snow"
                  name="description"
                  value={questionData.description}
                  onChange={handleDescriptionChange}
                  //   inputRef={inputRefs.description}
                  modules={Editor.modules}
                  formats={Editor.formats}
                />
              </Stack>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Question</Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity="warning"
      ></CustomSnackbar>
    </div>
  );
}

export default EditQuestionDialog;
