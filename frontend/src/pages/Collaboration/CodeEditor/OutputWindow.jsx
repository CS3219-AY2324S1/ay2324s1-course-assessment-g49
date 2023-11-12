import { Typography } from "@mui/material";
import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      return <pre>{atob(outputDetails?.compile_output)}</pre>;
    } else if (statusId === 3) {
      return (
        <pre>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre>{`Time Limit Exceeded`}</pre>;
    } else {
      return <pre>{atob(outputDetails?.stderr)}</pre>;
    }
  };
  return (
    <div>
      <Typography style={{ textAlign: "center" }} variant="h6">
        Output
      </Typography>
      <div>{outputDetails ? <>{getOutput()}</> : null}</div>
    </div>
  );
};

export default OutputWindow;
