import { TextField } from "@mui/material";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <TextField
        fullWidth
        rows={3}
        multiline
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Custom input"
      />
    </>
  );
};

export default CustomInput;
