import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
