import { createContext, useState } from "react";
import CustomSnackbar from "../components/CustomSnackbar";

export const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    message: "",
    open: false,
    severity: "info",
  });

  const closeSnackbar = () => {
    setSnack((prevSnack) => ({ ...prevSnack, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ snack, setSnack, closeSnackbar }}>
      {children}
      <CustomSnackbar
        open={snack.open}
        onClose={(reason) => {
          if (reason === "clickaway") {
            return;
          }
          closeSnackbar();
        }}
        message={snack.message}
        severity={snack.severity}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
