import { useState, useRef, useEffect } from 'react';
import QuestionList from './QuestionList';
import CustomSnackbar from './CustomSnackbar';
import './App.css';

function App() {
	const storedQuestions = JSON.parse(localStorage.getItem('questions'));

	const [questions, setQuestions] = useState(
		storedQuestions !== null ? storedQuestions : []
	);

	const [isSnackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setsnackbarMessage] = useState('');

	/**
	 * { id: 1, title: "question 1", category: "cat1", complexity: "easy", description: "aaa" },
	 * { id: 2, title: "question 2", category: "cat2", complexity: "easy", description: "bbb" },
	 */

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

	const handleDelete = (id) => {
		const updatedList = questions.filter(item => item.id !== id);
		setQuestions(updatedList);
		localStorage.setItem("questions", JSON.stringify(updatedList));
	}

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);

	return (
		<>
			<h1>Peerprep</h1>
			<QuestionList questions={questions} onDelete = {handleDelete}/>
			<form
				onSubmit={(evt) => {
					handleSubmit(evt);
				}}
			>
				<input
					type="text"
					placeholder="Question Title"
					ref={inputRefTitle}
				/>
				<input
					type="text"
					placeholder="Question Category"
					ref={inputRefCategory}
				/>
				<select name="Question Complexity" ref={inputRefComplexity}>
					<option value="Easy" defaultValue>
						Easy
					</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
				<input
					type="text"
					placeholder="Question Description"
					ref={inputRefDescription}
				/>
				<button>add item</button>
			</form>
			<CustomSnackbar
				open={isSnackbarOpen}
				onClose={handleSnackbarClose}
				message={snackbarMessage}
				severity="warning"
			></CustomSnackbar>
		</>
	);
}

export default App;
