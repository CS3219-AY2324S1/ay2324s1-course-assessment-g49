import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button } from "@mui/material";

function TimerComponent({ onTimerComplete, onTimerStopped }) {
  const [progress, setProgress] = useState(100);
  const [remaining, setRemaining] = useState(20);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const duration = 20;
    const interval = 1000;

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(progressTimer);
          onTimerComplete();
          return 0;
        }
        return prevProgress - (100 / duration) * (interval / 1000);
      });
    }, interval);

    const remainingTimer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(remainingTimer);
          onTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, interval);

    setTimerId([progressTimer, remainingTimer]);

    return () => {
      clearInterval(progressTimer);
      clearInterval(remainingTimer);
    };
  }, [onTimerComplete]);

  const stopTimer = () => {
    timerId.forEach((id) => clearInterval(id));
    setProgress(0);
    setRemaining(0);
    onTimerStopped();
    setTimerId([]);
  };

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
      <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
        <div>Remaining Time: {remaining} seconds</div>
        <Button variant="text" onClick={stopTimer}>
          Cancel
        </Button>
      </Box>
    </div>
  );
}

export default TimerComponent;
