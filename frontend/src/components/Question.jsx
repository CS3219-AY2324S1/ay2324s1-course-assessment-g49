import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function Question({ question, questionId, onDelete }) {
	return (
		<TableRow key={question.title}>
			<TableCell align="center">{questionId}</TableCell>
			<TableCell>{question.title}</TableCell>
			<TableCell>{question.category}</TableCell>
			<TableCell align="center">{question.complexity}</TableCell>
			<TableCell>{question.description}</TableCell>
			<TableCell>
				<button onClick={() => onDelete(question.title)}>Delete</button>
			</TableCell>
		</TableRow>
	);
}

export default Question;
