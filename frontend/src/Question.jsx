import * as React from "react";
import { Link } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Question({ question, questionId, onDelete }) {
  const categories = question.categories.join(", ");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <TableRow key={question.title}>
      <TableCell align="center">{questionId}</TableCell>
      <TableCell>
        <Link onClick={handleOpen}>{question.title}</Link>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Question Description</DialogTitle>
          <DialogContent>
            <DialogContentText dangerouslySetInnerHTML={{ __html: question.description }}>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </TableCell>
      <TableCell>{categories}</TableCell>
      <TableCell align="center">{question.complexity}</TableCell>
      {/* <TableCell>{question.description}</TableCell> */}
      <TableCell>
        <button onClick={() => onDelete(question.id)}>Delete </button>
      </TableCell>
    </TableRow>
  );
}

export default Question;
