import { useState, useEffect } from 'react';
import './App.css';
import QuestionList from './QuestionList';
import AddQuestionDialog from './AddQuestionDialog';
import Box from '@mui/material/Box';

function App() {
	const storedQuestions = JSON.parse(localStorage.getItem('questions'));

	const [questions, setQuestions] = useState(
		storedQuestions !== null ? storedQuestions : []
	);

	const handleNewQuestion = (newQuestion) => {
		setQuestions([...questions, newQuestion]);
	};

	const handleDelete = (title) => {
		const updatedList = questions.filter((item) => item.title !== title);
		setQuestions(updatedList);
		localStorage.setItem('questions', JSON.stringify(updatedList));
	};

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);

	return (
		<>
			<h1>Peerprep</h1>
			<Box direction="column">
				<Box mb={2}>
					<AddQuestionDialog onAddQuestion={handleNewQuestion} />
				</Box>
				<Box mb={2}>
					<QuestionList
						questions={questions}
						onDelete={handleDelete}
					/>
				</Box>
			</Box>
		</>
	);
}

export default App;
