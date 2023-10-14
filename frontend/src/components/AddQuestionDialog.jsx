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
  InputLabel,
  Select,
  Chip,
} from "@mui/material";
import CustomSnackbar from "./CustomSnackbar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import {
  categoriesOptions,
  categoryMapping,
  complexityOptions,
} from "../utils/QuestionUtil";

function AddQuestionDialog({ onAddQuestion }) {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const inputRefs = {
    title: useRef(null),
  };

  const fieldOptions = {
    complexity: complexityOptions,
    categories: categoriesOptions,
  };

  const [questions, setQuestions] = useState([]);
  const [complexity, setComplexity] = useState(fieldOptions["complexity"][0]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState("");

  const handleSelectChange = (event, id) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setDescription("");
    setCategory([]);
    setComplexity(fieldOptions["complexity"][0]);
    setOpenDialog(false);
  };

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

    const title = inputRefs["title"].current.value.trim();
    const categories = category;
    const descriptionClean = description.replace(/<(?!img)[^>]*>/g, "").trim();

    const isDuplicateQuestion = questions.some(
      (question) => question.title.toLowerCase() === title.toLowerCase()
    );

    const isInputFieldEmpty =
      !title ||
      !complexity ||
      categories.length == 0 ||
      descriptionClean.length == 0;

    if (isDuplicateQuestion) {
      handleDuplicateQuestion();
    } else if (isInputFieldEmpty) {
      handleEmptyInputField();
    } else {
      for (let i = 0; i < categories.length; i++) {
        categories[i] = categoryMapping[categories[i]];
      }

      const newQuestion = {
        title,
        complexity,
        categories,
        description,
      };

      await axios.post(`${databaseURL}/question`, newQuestion);
      onAddQuestion();
      setCategory([]);
      setComplexity(fieldOptions["complexity"][0]);
      handleClose();
    }
  };

  const renderSelectField = (state, id, label, multiple, handleChange) => (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={state}
        onChange={handleChange}
        renderValue={(selected) => (
          <>
            {multiple ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            ) : (
              selected
            )}
          </>
        )}
      >
        {renderOptions(id)}
      </Select>
    </>
  );

  const renderTextField = (id, label) => (
    <TextField
      className="textField same-width-textfield"
      id={id}
      label={label}
      variant="filled"
      inputRef={inputRefs[id]}
    ></TextField>
  );

  const renderOptions = (id) => {
    const options = fieldOptions[id];
    return options.map((option) => (
      <MenuItem value={option} key={option}>
        {option}
      </MenuItem>
    ));
  };

  const fetchQuestions = async () => {
    try {
      const storedQuestions = await axios.get(`${databaseURL}/question`);
      setQuestions(storedQuestions.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    onAddQuestion();
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add a Question
      </Button>
      <Dialog open={openDialog} onClose={handleClose}>
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
                {renderTextField("title", "Question Title")}
                {renderSelectField(
                  complexity,
                  "complexity",
                  "Question Complexity",
                  false,
                  (e) => setComplexity(e.target.value)
                )}
                {renderSelectField(
                  category,
                  "categories",
                  "Question Category",
                  true,
                  handleSelectChange
                )}
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
