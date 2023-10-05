import { useState } from 'react';
import {
	Button,
	Stack,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import axios from 'axios';

function Settings() {
	const userId = 'userId'; // TODO: obtain user id after logging in
	const [openDialog, setOpenDialog] = useState(false);

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
			await axios.delete(`http://localhost:8080/users/${userId}`);
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
					<DialogTitle>{'Delete your account?'}</DialogTitle>
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
