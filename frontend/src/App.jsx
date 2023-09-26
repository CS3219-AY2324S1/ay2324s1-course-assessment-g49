import { useState, useRef, useEffect } from 'react';
import QuestionList from './QuestionList';
import CustomSnackbar from './CustomSnackbar';
import './App.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Theme from './themes/Theme';

function App() {
	const storedQuestions = JSON.parse(localStorage.getItem('questions'));

	const [questions, setQuestions] = useState(
		storedQuestions !== null ? storedQuestions : []
	);

	const [isSnackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setsnackbarMessage] = useState('');

	const inputRefTitle = useRef(null);
	const inputRefCategory = useRef(null);
	const inputRefComplexity = useRef(null);
	const inputRefDescription = useRef(null);

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

			setQuestions([...questions, newQuestion]);
			inputRefTitle.current.value = '';
			inputRefComplexity.current.value = 'Easy';
			inputRefCategory.current.value = '';
			inputRefDescription.current.value = '';
		}
	};

	const handleDelete = (title) => {
		const updatedList = questions.filter((item) => item.title !== title);
		setQuestions(updatedList);
		localStorage.setItem('questions', JSON.stringify(updatedList));
	};

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);

	const complexityLevels = ['Easy', 'Medium', 'Hard'];

	return (
		<>
			<Theme>
				<h1>Peerprep</h1>
				<Box direction="column">
					<Box mb={2}>
						<form
							onSubmit={(evt) => {
								handleSubmit(evt);
							}}
						>
							<Stack spacing={2} direction="row">
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
								<Button
									type="submit"
									variant="contained"
									className="same-width-textfield"
								>
									Add Item
								</Button>
							</Stack>
						</form>
					</Box>
					<Box mb={2}>
						<QuestionList
							questions={questions}
							onDelete={handleDelete}
						/>
					</Box>
					<CustomSnackbar
						open={isSnackbarOpen}
						onClose={handleSnackbarClose}
						message={snackbarMessage}
						severity="warning"
					></CustomSnackbar>
				</Box>
			</Theme>
		</>
	);
}

export default App;
