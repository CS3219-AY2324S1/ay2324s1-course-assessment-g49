import Question from './Question';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function QuestionList({ questions, onDelete }) {
	const darkTheme = createTheme({ palette: { mode: 'dark' } });

	/**const [questions, setQuestions] = useState([
    { id: 1, title: "question 1", complexity: "easy", description: "aaa" },
    { id: 2, title: "question 2", complexity: "easy", description: "bbb" },
  ]);*/

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<TableContainer component={Paper} elevation={5}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">
									Question No.
								</TableCell>
								<TableCell align="center">
									Question Title
								</TableCell>
								<TableCell align="center">
									Question Category
								</TableCell>
								<TableCell align="center">
									Question Complexity
								</TableCell>
								<TableCell align="center">
									Question Description
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{questions.map((question, index) => (
								<Question
									key={question.title}
									questionId={index + 1}
									question={question}
									onDelete={onDelete}
								></Question>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</ThemeProvider>
		</div>
	);
}

export default QuestionList;
