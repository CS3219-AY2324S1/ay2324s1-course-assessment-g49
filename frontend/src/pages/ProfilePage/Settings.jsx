import { Button, Stack, Typography } from '@mui/material';

function Settings() {
	return (
		<div>
			<Stack alignItems="flex-start" direction="column" spacing={2}>
				<Typography variant="h4">Settings</Typography>
				<Button variant="contained" color="error">
					Delete Account
				</Button>
			</Stack>
		</div>
	);
}

export default Settings;
