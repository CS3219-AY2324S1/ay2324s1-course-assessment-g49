import { useState, useContext } from "react";
import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import userContextProvider from "../../utils/UserContextUtil";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../utils/SnackbarContextUtil";

function Settings() {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const { userContext, setUserContext } = useContext(userContextProvider);
  const userId = userContext.userId;
  const [openDialog, setOpenDialog] = useState(false);
  const { snack, setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleDeleteDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /*
	Handler to delete user's account
	*/
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${databaseURL}/users/${userId}`);
      navigate("/");
      localStorage.setItem(
        "user",
        JSON.stringify({ username: null, id: null })
      );
      setSnack({
        message: "Profile deleted successfully",
        open: true,
        severity: "info",
      });
    } catch (error) {
      console.error("Error deleting user's account", error);
    }
    setOpenDialog(false);
  };

  return (
    <div>
      <Stack alignItems="flex-start" direction="column" spacing={2}>
        <Typography variant="h4">Settings</Typography>
        <Button variant="contained" color="error" onClick={handleDeleteDialog}>
          Delete Account
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{"Delete your account?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action is irreversible. All your data, including your account
              settings and content, will be permanently deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>No</Button>
            <Button onClick={handleDeleteAccount}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </div>
  );
}

export default Settings;
