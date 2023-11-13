import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

function TimerComponent({ onTimerComplete }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 20;
    const interval = 1000;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          onTimerComplete();
          return 0;
        }
        return prevProgress - (100 / duration) * (interval / 1000);
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}

export default TimerComponent;
