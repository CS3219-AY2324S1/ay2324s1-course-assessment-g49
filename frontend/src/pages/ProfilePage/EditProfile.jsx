import { useState } from 'react';
import { Button, IconButton, TextField, Grid, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

function EditProfile() {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<Grid container alignItems="flex-start" direction="column" spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h4">Edit Profile</Typography>
			</Grid>
			<Grid container item direction="column" spacing={2}>
				<Grid item xs={12}>
					<TextField
						defaultValue="users's username"
						variant="filled"
						label="Username"
						fullWidth
					></TextField>
				</Grid>
				<Grid item xs={6}>
					<TextField
						defaultValue="user's email"
						variant="filled"
						label="Email"
						fullWidth
					></TextField>
				</Grid>
				<Grid item xs={12}>
					<TextField
						defaultValue="user's country"
						variant="filled"
						label="Country"
						fullWidth
					></TextField>
				</Grid>
				<Grid item xs={12}>
					<TextField
						defaultValue="user's password"
						variant="filled"
						type={showPassword ? 'text' : 'password'}
						label="Password"
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowPassword}
										edge="end"
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					></TextField>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained">Save</Button>
			</Grid>
		</Grid>
	);
}

export default EditProfile;
