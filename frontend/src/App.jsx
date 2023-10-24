import "./App.css";
import { useState } from "react";
import { Grid } from "@mui/material";
import Theme from "./themes/Theme";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import QuestionsRepo from "./pages/QuestionsRepo";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import userContextProvider from "./utils/Context.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const [userContext, setUserContext] = useState({
    username: user ? user.username : null,
    userId: user ? user.id : null,
  });
  const value = { userContext, setUserContext };

  return (
    <>
      <Theme>
        <Grid container>
          <Grid item xs={12}>
            <userContextProvider.Provider value={value}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/questions" element={<QuestionsRepo />} />
              </Routes>
            </userContextProvider.Provider>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
}

export default App;
