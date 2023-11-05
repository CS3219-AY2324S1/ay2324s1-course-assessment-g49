import { useState, useRef, useEffect, useContext } from "react";
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
  InputLabel,
  Select,
  Chip,
} from "@mui/material";
import { SnackbarContext } from "../utils/SnackbarContextUtil";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import EditIcon from "@mui/icons-material/Edit";
import {
  categoriesOptions,
  categoryMapping,
  reverseCategoryMapping,
  complexityOptions,
} from "../utils/QuestionUtil";
import AuthenticationToken from "../services/AuthenticationToken";

function EditQuestionDialog({ question, onEdit }) {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const inputRefs = {
    title: useRef(null),
    categories: useRef(null),
    complexity: useRef(null),
    description: useRef(null),
  };

  const fieldOptions = {
    complexity: complexityOptions,
    categories: categoriesOptions,
  };

  const [questions, setQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [questionData, setQuestionData] = useState({
    title: "",
    categories: "",
    complexity: "",
    description: "",
  });
  const [oldQuestionData, setOldQuestionData] = useState({ ...questionData });
  const { snack, setSnack } = useContext(SnackbarContext);

  const handleClickOpen = () => {
    fetchData();
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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

  const handleSelectChange = (name, evt) => {
    setQuestionData((prevQuestionData) => ({
      ...prevQuestionData,
      [name]: evt.target.value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const title = inputRefs.title.current.value.trimEnd();
    const complexity = inputRefs.complexity.current.value;
    const categories = inputRefs.categories.current.value;
    const description = inputRefs.description.current.value;
    const descriptionClean = description.replace(/<(?!img)[^>]*>/g, "").trim();

    const isDuplicateQuestion =
      questions !== null &&
      questions.some(
        (question) =>
          question.title.toLowerCase() === title.toLowerCase() &&
          question.title.toLowerCase() != oldQuestionData.title.toLowerCase()
      );

    const isInputFieldEmpty =
      !title ||
      !complexity ||
      categories.length == 0 ||
      descriptionClean.length == 0;

    if (isDuplicateQuestion) {
      setSnack({
        message: "Duplicate question detected!",
        open: true,
        severity: "warning",
      });
    } else if (isInputFieldEmpty) {
      setSnack({
        message: "Missing fields detected!",
        open: true,
        severity: "warning",
      });
    } else {
      try {
        for (let i = 0; i < categories.length; i++) {
          categories[i] = categoryMapping[categories[i]];
        }
        const newQuestion = {
          title,
          complexity,
          categories,
          description,
        };
        const fieldsToUpdate = Object.keys(newQuestion).reduce((acc, key) => {
          if (oldQuestionData[key] !== newQuestion[key]) {
            acc[key] = newQuestion[key];
          }
          return acc;
        }, {});
        onEdit(question.id, fieldsToUpdate);

        if (Object.keys(fieldsToUpdate).length > 0) {
          setOldQuestionData(fieldsToUpdate);
        }
        handleClose();
      } catch (error) {
        setSnack({
          message: error.response.data,
          open: true,
          severity: "warning",
        });
        console.error("Error updating question data", error);
      }
    }
  };

  const renderOptions = (id) => {
    const options = fieldOptions[id];
    return options.map((option) => (
      <MenuItem value={option} key={option}>
        {option}
      </MenuItem>
    ));
  };

  const renderTextField = (id, label, handleChange) => (
    <TextField
      className="textField same-width-textfield"
      name={id}
      label={label}
      value={questionData[id]}
      variant="filled"
      inputRef={inputRefs[id]}
      onChange={handleChange}
    ></TextField>
  );

  const renderSelectField = (id, label, multiple, handleChange) => (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={questionData[id]}
        onChange={handleChange}
        inputRef={inputRefs[id]}
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${databaseURL}/question/${question.id}`, { headers: AuthenticationToken() }
      );
      const data = response.data;
      const cat = data.categories;
      for (let i = 0; i < cat.length; i++) {
        cat[i] = reverseCategoryMapping[cat[i]];
      }
      data.categories = cat;
      setQuestionData(data);
      setOldQuestionData(data);
      const storedQuestions = await axios.get(`${databaseURL}/question`, { headers: AuthenticationToken() });
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
      <Dialog open={openDialog} onClose={handleClose}>
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
                {renderTextField("title", "Question Title", handleFieldChange)}
                {renderSelectField(
                  "complexity",
                  "Question Complexity",
                  false,
                  (e) => handleSelectChange("complexity", e)
                )}
                {renderSelectField(
                  "categories",
                  "Question Category",
                  true,
                  (e) => handleSelectChange("categories", e)
                )}
                <DialogContentText>Question Description</DialogContentText>
                <ReactQuill
                  ref={inputRefs.description}
                  theme="snow"
                  name="description"
                  value={questionData.description}
                  onChange={handleDescriptionChange}
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
    </div>
  );
}

export default EditQuestionDialog;
