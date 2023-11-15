import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Attempt from "./Attempt";

function AttemptsList({ attempts }) {
  return (
    <div>
      <TableContainer component={Paper} elevation={5}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Question No.</TableCell>
              <TableCell align="center">Question Title</TableCell>
              <TableCell align="center">Question Complexity</TableCell>
              <TableCell align="center">Attempt Date and Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attempts.map((attempt, index) => (
              <Attempt
                key={index + 1}
                attemptNo={index + 1}
                questionId={attempt.questionId}
                timestamp={attempt.epochTimestamp}
              ></Attempt>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AttemptsList;
