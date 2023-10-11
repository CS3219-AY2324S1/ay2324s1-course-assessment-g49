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

function AddQuestionDialog({ questions, onAddQuestion }) {
  const inputRefs = {
    title: useRef(null),
    category: useRef(null),
    complexity: useRef(null),
  };
  const complexityLevels = ["EASY", "MEDIUM", "HARD"];
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDescription("");
    setOpen(false);
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
    const complexity = inputRefs["complexity"].current.value;
    const categories = inputRefs["category"].current.value.split(", ");
    const regexArray = [
      /^$/, // empty string
      /^(<p><br><\/p>)*$/, // repeated break lines
      /^<p>\s*<\/p>$/, // whitespaces
    ];
    const isEmptyDescription = regexArray.some((regex) =>
      regex.test(description)
    );

    const isDuplicateQuestion = questions.some(
      (question) => question.title.toLowerCase() === title.toLowerCase()
    );

    const isInputFieldEmpty =
      !title || !complexity || !categories || isEmptyDescription;

    if (isDuplicateQuestion) {
      handleDuplicateQuestion();
    } else if (isInputFieldEmpty) {
      handleEmptyInputField();
    } else {
      const newQuestion = {
        title,
        complexity,
        categories,
        description,
      };

      await axios.post("http://localhost:8080/question", newQuestion);
      onAddQuestion();
      handleClose();
    }
  };

  const renderTextField = (id, label) => (
    <TextField
      select={id == "complexity"}
      className="textField same-width-textfield"
      id={id}
      label={label}
      variant="filled"
      inputRef={inputRefs[id]}
      defaultValue={id === "complexity" ? complexityLevels[0] : null}
    >
      {id == "complexity" && renderComplexityLevels()}
    </TextField>
  );

  const renderComplexityLevels = () =>
    complexityLevels.map((option) => (
      <MenuItem value={option} key={option}>
        {option}
      </MenuItem>
    ));

  useEffect(() => {
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
                {renderTextField("title", "Question Title")}
                {renderTextField("category", "Question Category")}
                {renderTextField("complexity", "Question Complexity")}
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
