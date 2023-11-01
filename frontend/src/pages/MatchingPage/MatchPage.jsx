import { useState, useContext } from "react";
import {
  Grid,
  InputLabel,
  Select,
  Box,
  Chip,
  Stack,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import NavBar from "../../components/NavBar";
import { complexityOptions } from "../../utils/QuestionUtil";
import { SnackbarContext } from "../../utils/SnackbarContextUtil";
import { useNavigate } from "react-router-dom";

function MatchPage() {
  const fieldOptions = {
    complexity: complexityOptions,
  };

  const [complexity, setComplexity] = useState(fieldOptions["complexity"][0]);
  const { snack, setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const isEmptyField = !complexity;

    if (isEmptyField) {
      setSnack({
        message: "Missing input fields detected!",
        open: true,
        severity: "warning",
      });
    } else {
      navigate("/matching", { state: { complexity: complexity } });
    }
  };

  const renderOptions = (id) => {
    const options = fieldOptions[id];
    return options.map((option) => (
      <MenuItem value={option} key={option}>
        {option}
      </MenuItem>
    ));
  };

  const renderSelectField = (state, id, label, multiple, handleChange) => (
    <>
      <InputLabel style={{ textAlign: "left" }}>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={state}
        onChange={handleChange}
        renderValue={(selected) => (
          <>
            {multiple ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            ) : (
              selected
            )}
          </>
        )}
      >
        {renderOptions(id)}
      </Select>
    </>
  );

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <Stack alignItems="flex-start" direction="column" spacing={1} ml={5}>
            <Typography variant="h4" style={{ textAlign: "left" }}>
              Matching Page
            </Typography>
            <Typography variant="h6" style={{ textAlign: "left" }}>
              Choose your preferred criteria and practice with another user.
            </Typography>
            <Grid container item>
              <Grid item sx={{ width: "50%" }} mt={3}>
                <Stack spacing={2}>
                  {renderSelectField(
                    complexity,
                    "complexity",
                    "Question Complexity",
                    false,
                    (e) => setComplexity(e.target.value)
                  )}

                  <Button
                    id="connect"
                    variant="contained"
                    onClick={handleButtonClick}
                  >
                    Start Matching
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default MatchPage;
