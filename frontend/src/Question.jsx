import * as React from 'react';
import { Link } from '@mui/material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import axios from 'axios';

function Question({ question, questionId, onDelete }) {
	const categories = question.categories.join(', ');
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [description, setDescription] = React.useState('');

	const loadDesciption = async () => {
		const response = await axios.get(
			'http://localhost:8080/question/' + question.id
		);
		setDescription(response.data.description);
	};

	useEffect(() => {
		loadDesciption();
	}, []);

	return (
		<TableRow key={question.title}>
			<TableCell align="center">{questionId}</TableCell>
			<TableCell>
				<Link onClick={handleOpen}>{question.title}</Link>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Question Description</DialogTitle>
					<DialogContent>
						<DialogContentText
							dangerouslySetInnerHTML={{ __html: description }}
						></DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
					</DialogActions>
				</Dialog>
			</TableCell>
			<TableCell>{categories}</TableCell>
			<TableCell align="center">{question.complexity}</TableCell>
			<TableCell>
				<button onClick={() => onDelete(question.id)}>Delete </button>
			</TableCell>
		</TableRow>
	);
}

export default Question;
