import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function Question({ question, questionId, onDelete }) {
	const categories = question.categories.join(", ") 
	return (
		<TableRow key={question.title}>
			<TableCell align="center">{questionId}</TableCell>
			<TableCell>{question.title}</TableCell>
			<TableCell>{categories}</TableCell>
			<TableCell align="center">{question.complexity}</TableCell>
			<TableCell>
				<button onClick={() => onDelete(question.id)}>Delete </button>
			</TableCell>
		</TableRow>
	);
}

export default Question;
