import { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import QuestionList from "../../components/QuestionList";
import axios from "axios";
import AuthenticationToken from "../../services/AuthenticationToken";
import AttemptsList from "../../components/AttemptsList";

function PastSubmissions() {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const [history, setHistory] = useState(null);
  const loadHistory = async () => {
    try {
      const attemptsHistory = await axios.get(`${databaseURL}/attempt`, {
        headers: AuthenticationToken(),
      });
      setHistory(attemptsHistory.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div>
      <Stack alignItems="flex-start" direction="column" spacing={2}>
        <Typography variant="h4">Past Submissions</Typography>
        {history && <AttemptsList attempts={history} />}
      </Stack>
    </div>
  );
}

export default PastSubmissions;
