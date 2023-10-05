import { useEffect, useRef, useState } from 'react';
import {
	Button,
	IconButton,
	TextField,
	Grid,
	Typography,
	InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomSnackbar from '../../components/CustomSnackbar';
import axios from 'axios';

function EditProfile() {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const inputRefs = {
		username: useRef(null),
		email: useRef(null),
		country: useRef(null),
		password: useRef(null),
	};
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		country: '',
		password: '',
	});
	const [oldUserData, setOldUserData] = useState({ ...userData });
	const [isSnackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setsnackbarMessage] = useState('');

	const handleSnackbarClose = (event, reason) => {
		if (reason == 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	/*
	Fetch user's data 
	*/
	const fetchData = async () => {
		try {
			const response = await axios.get('http://localhost:8080/users/1');
			setUserData(response.data);
			setOldUserData(response.data);
		} catch (error) {
			console.error('Error fetching user data', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	/*
	Handler to update user's data when fields are edited
	*/
	const handleFieldChange = (evt) => {
		const { name, value } = evt.target;
		setUserData((prevUserData) => ({
			...prevUserData,
			[name]: value,
		}));
	};

	/*
	Renders snackbar with error message
	*/
	const handleError = (message) => {
		setsnackbarMessage(message);
		setSnackbarOpen(true);
	};

	/*
	Handler to submit user's updated data
	Only sends patch request with updated fields
	Sets oldUserData with user's updated data
	*/
	const handleSave = async () => {
		try {
			const fieldsToUpdate = Object.keys(userData).reduce((acc, key) => {
				if (oldUserData[key] !== userData[key]) {
					acc[key] = userData[key];
				}
				return acc;
			}, {});

			await axios.patch('http://localhost:8080/users/1', fieldsToUpdate);

			if (Object.keys(fieldsToUpdate).length > 0) {
				setOldUserData(fieldsToUpdate);
			}
		} catch (error) {
			handleError(error.response.data);
			console.error("Error updating user's data", error);
		}
	};

	const passwordInputProps = {
		endAdornment: (
			<InputAdornment position="end">
				<IconButton onClick={handleClickShowPassword} edge="end">
					{showPassword ? <VisibilityOff /> : <Visibility />}
				</IconButton>
			</InputAdornment>
		),
	};

	const renderTextField = (name, label, type = 'text') => (
		<Grid item xs={12}>
			<TextField
				label={label}
				name={name}
				value={userData[name] || 'placeholderpassword'}
				variant="filled"
				fullWidth
				type={type}
				onChange={handleFieldChange}
				inputRef={inputRefs[name]}
				InputProps={name === 'password' ? passwordInputProps : undefined}
			/>
		</Grid>
	);

	return (
		<Grid container alignItems="flex-start" direction="column" spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h4">Edit Profile</Typography>
			</Grid>
			<Grid container item direction="column" spacing={2}>
				{renderTextField('username', 'Username')}
				{renderTextField('email', 'Email')}
				{renderTextField('country', 'Country')}
				{renderTextField(
					'password',
					'Password',
					showPassword ? 'text' : 'password'
				)}
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" onClick={handleSave}>
					Save
				</Button>
			</Grid>
			<CustomSnackbar
				open={isSnackbarOpen}
				onClose={handleSnackbarClose}
				message={snackbarMessage}
				severity="warning"
			></CustomSnackbar>
		</Grid>
	);
}

export default EditProfile;
