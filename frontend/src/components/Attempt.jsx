import { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import AuthenticationToken from "../services/AuthenticationToken";

function Attempt({ attemptNo, questionId, timestamp }) {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const [question, setQuestion] = useState(null);
  const dateTimestamp = new Date(timestamp);
  const formattedDate = dateTimestamp.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const loadQuestionDetails = async () => {
    const response = await axios.get(`${databaseURL}/question/${questionId}`, {
      headers: AuthenticationToken(),
    });
    setQuestion(response.data);
  };
  useEffect(() => {
    loadQuestionDetails();
  }, []);
  return (
    <TableRow key={attemptNo}>
      <TableCell align="center">{attemptNo}</TableCell>
      {question && <TableCell>{question.title}</TableCell>}
      {question && <TableCell align="center">{question.complexity}</TableCell>}
      <TableCell align="center">{formattedDate}</TableCell>
    </TableRow>
  );
}

export default Attempt;
