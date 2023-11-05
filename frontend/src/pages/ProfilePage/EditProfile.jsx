import { useEffect, useRef, useState, useContext } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import axios from "axios";
import userContextProvider from "../../utils/UserContextUtil";
import { SnackbarContext } from "../../utils/SnackbarContextUtil";
import CountrySelect from "../../components/CountrySelect";
import AuthenticationToken from "../../services/AuthenticationToken";

function EditProfile() {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const { userContext, setUserContext } = useContext(userContextProvider);
  const userId = userContext.userId;
  const inputRefs = {
    username: useRef(null),
    email: useRef(null),
    country: useRef(null),
  };
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    country: "",
  });

  const { snack, setSnack } = useContext(SnackbarContext);

  /*
  Fetch user's data 
  */
  const fetchData = async () => {
    try {
      const response = await axios.get(`${databaseURL}/users/${userId}`, { headers: AuthenticationToken() });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
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

  const handleCountryChange = (selectedCountryLabel) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ["country"]: selectedCountryLabel,
    }));
  };
  /*
  Handler to submit user's updated data
  Only sends patch request with updated fields
  */
  const handleSave = async () => {
    try {
      let hasMissingFields = false;
      let hasWhiteSpaces = false;
      for (const key in userData) {
        if (typeof userData[key] === "string") {
          userData[key] = userData[key].trimEnd();
        }
        if (key == "email" || key == "username") {
          if (/^\s*$/.test(userData[key])) {
            hasMissingFields = true;
          } else if (/\s/.test(userData[key])) {
            hasWhiteSpaces = true;
          }
        }
      }
      if (hasMissingFields) {
        setSnack({
          message: "Missing input fields detected!",
          open: true,
          severity: "warning",
        });
      } else if (hasWhiteSpaces) {
        setSnack({
          message: "No whitespaces allowed in username or email!",
          open: true,
          severity: "warning",
        });
      } else {
        await axios.patch(`${databaseURL}/users/${userId}`, userData, { headers: AuthenticationToken() });

        setSnack({
          message: "Saved successfully",
          open: true,
          severity: "success",
        });
        fetchData();
      }
    } catch (error) {
      console.log(error);
      setSnack({
        message: error.response.data,
        open: true,
        severity: "warning",
      });
      console.error("Error updating user's data", error);
    }
  };

  const renderTextField = (name, label, type = "text") => (
    <Grid item xs={12}>
      <TextField
        label={label}
        name={name}
        value={userData[name]}
        variant="filled"
        fullWidth
        type={type}
        onChange={handleFieldChange}
        inputRef={inputRefs[name]}
      />
    </Grid>
  );

  return (
    <Grid container alignItems="flex-start" direction="column" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Edit Profile</Typography>
      </Grid>
      <Grid container item direction="column" spacing={2}>
        {renderTextField("username", "Username")}
        {renderTextField("email", "Email")}
        <Grid item xs={12}>
          <CountrySelect
            inputRefCountry={inputRefs["country"]}
            defaultCountryLabel={userData["country"]}
            onSelect={handleCountryChange}
          ></CountrySelect>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditProfile;
