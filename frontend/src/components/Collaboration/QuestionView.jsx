import { useEffect, useState } from "react";
import axios from "axios";
import AuthenticationToken from "../../services/AuthenticationToken";
import { Grid } from "@mui/material";

function QuestionView({ questionId }) {
  const [description, setDescription] = useState(null);
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const loadQuestion = async () => {
    const response = await axios.get(`${databaseURL}/question/${questionId}`, {
      headers: AuthenticationToken(),
    });
    setDescription(response.data.description);
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <Grid item>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        style={{ textAlign: "left" }}
      />
    </Grid>
  );
}

export default QuestionView;
