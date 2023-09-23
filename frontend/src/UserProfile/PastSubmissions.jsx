import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import QuestionList from '../QuestionList';

function PastSubmissions() {
	const storedQuestions = JSON.parse(localStorage.getItem('questions'));

	const [questions, setQuestions] = useState(
		storedQuestions !== null ? storedQuestions : []
	);

	return (
		<div>
			<Stack alignItems="flex-start" direction="column" spacing={2}>
				<Typography variant="h4">Past Submissions</Typography>
				<QuestionList questions={questions} />
			</Stack>
		</div>
	);
}

export default PastSubmissions;
