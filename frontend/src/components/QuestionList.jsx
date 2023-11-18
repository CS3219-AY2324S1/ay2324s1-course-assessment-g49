import Question from "./Question";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function QuestionList({ questions, onDelete, onEdit, userRole }) {
  return (
    <div>
      <TableContainer component={Paper} elevation={5}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Question No.</TableCell>
              <TableCell align="center">Question Title</TableCell>
              <TableCell align="center">Question Category</TableCell>
              <TableCell align="center">Question Complexity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <Question
                key={question.title}
                questionId={index + 1}
                question={question}
                onDelete={onDelete}
                onEdit={onEdit}
                userRole={userRole}
              ></Question>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default QuestionList;
