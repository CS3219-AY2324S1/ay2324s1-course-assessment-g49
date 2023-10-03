import { useState, useRef, useEffect } from 'react';
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
} from '@mui/material';
import CustomSnackbar from './CustomSnackbar';

function AddQuestionDialog({ onAddQuestion }) {
	const storedQuestions = JSON.parse(localStorage.getItem('questions'));

	const questions = storedQuestions !== null ? storedQuestions : [];

	const inputRefTitle = useRef(null);
	const inputRefCategory = useRef(null);
	const inputRefComplexity = useRef(null);
	const inputRefDescription = useRef(null);

	const complexityLevels = ['Easy', 'Medium', 'Hard'];

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [isSnackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setsnackbarMessage] = useState('');

	const handleDuplicateQuestion = () => {
		setsnackbarMessage('Duplicate question detected!');
		setSnackbarOpen(true);
	};

	const handleEmptyInputField = () => {
		setsnackbarMessage('Missing fields detected!');
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason == 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const title = inputRefTitle.current.value;
		const complexity = inputRefComplexity.current.value;
		const category = inputRefCategory.current.value;
		const description = inputRefDescription.current.value;

		const isDuplicateQuestion =
			questions !== null &&
			questions.some((question) => question.title === title);

		const isInputFieldEmpty =
			!title || !complexity || !category || !description;

		if (isDuplicateQuestion) {
			handleDuplicateQuestion();
		} else if (isInputFieldEmpty) {
			handleEmptyInputField();
		} else {
			const newQuestion = {
				title,
				complexity,
				category,
				description,
			};
			onAddQuestion(newQuestion);
			handleClose();
		}
	};

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);

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
								To add a new question, please enter all details
								below.
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
								<TextField
									className="textField same-width-textfield"
									id="Question Category"
									label="Question Category"
									variant="filled"
									inputRef={inputRefCategory}
								></TextField>
								<TextField
									select
									name="Question Complexity"
									label="Question Complexity"
									variant="filled"
									defaultValue="Easy"
									inputRef={inputRefComplexity}
									className="textField same-width-textfield"
								>
									{complexityLevels.map((option) => (
										<MenuItem value={option} key={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
								<TextField
									className="textField same-width-textfield"
									id="Question Description"
									label="Question Description"
									variant="filled"
									inputRef={inputRefDescription}
								></TextField>
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
