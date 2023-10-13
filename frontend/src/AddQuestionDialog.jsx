import { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  MenuItem,
  Box,
} from "@mui/material";
import CustomSnackbar from "./CustomSnackbar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

function AddQuestionDialog({ onAddQuestion }) {
  // const storedQuestions = JSON.parse(localStorage.getItem("questions"));
  // const questions = storedQuestions !== null ? storedQuestions : [];
  const [questions, setQuestions] = useState([]);


  const inputRefTitle = useRef(null);
  const inputRefComplexity = useRef(null);
  const complexityLevels = ["EASY", "MEDIUM", "HARD"];
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);

  const categories = [
    "Strings",
    "Algorithms",
    "Data Structures",
    "Bit Manipulation",
    "Recursion",
    "Databases",
    "Brainteaser",
  ];

  var categoryDict = {
    Strings: "STRINGS",
    Algorithms: "ALGORITHMS",
    "Data Structures": "DATA_STRUCTURES",
    "Bit Manipulation": "BIT_MANIPULATION",
    Recursion: "RECURSION",
    Databases: "DATABASES",
    Brainteaser: "BRAINTEASER",
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDescription("");
    setOpen(false);
  };

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState("");

  const handleDuplicateQuestion = () => {
    setsnackbarMessage("Duplicate question detected!");
    setSnackbarOpen(true);
  };

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

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const title = inputRefTitle.current.value;
    const complexity = inputRefComplexity.current.value;
    const categories = category;
    const descriptionClean = description.replace(/<(?!img)[^>]*>/g, "").trim();

    const isDuplicateQuestion =
      questions !== null &&
      questions.some((question) => question.title === title);

    const isInputFieldEmpty =
      !title || !complexity || !categories || descriptionClean.length == 0;

    if (isDuplicateQuestion) {
      handleDuplicateQuestion();
    } else if (isInputFieldEmpty) {
      handleEmptyInputField();
    } else {
      for (let i = 0; i < categories.length; i++) {
        categories[i] = categoryDict[categories[i]];
      }

      const newQuestion = {
        title,
        complexity,
        categories,
        description,
      };

      await axios.post("http://localhost:8080/question", newQuestion);
      onAddQuestion();
      setCategory([]);
      handleClose();
    }
  };

  const fetchQuestions=async()=>{
    try {
      const storedQuestions = await axios.get(
        `http://localhost:8080/question`
      );
      setQuestions(storedQuestions.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
    
  }

  useEffect(() => {
    fetchQuestions();
    onAddQuestion();
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add a Question
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <Box direction="column">
            <Box mb={2}>
              <DialogContentText>
                To add a new question, please enter all details below.
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
                  id="Question Title"
                  label="Question Title"
                  variant="filled"
                  inputRef={inputRefTitle}
                ></TextField>
                <InputLabel id="multiple-category-label">Category</InputLabel>
                <Select
                  labelId="multiple-category-label"
                  id="multiple-category"
                  multiple
                  value={category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  select
                  name="Question Complexity"
                  label="Question Complexity"
                  variant="filled"
                  defaultValue={complexityLevels[0]}
                  inputRef={inputRefComplexity}
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
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  modules={Editor.modules}
                  formats={Editor.formats}
                />
              </Stack>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Question</Button>
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

export default AddQuestionDialog;
