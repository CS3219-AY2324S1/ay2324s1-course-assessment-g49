import "./App.css";
import { useState } from "react";
import { Grid } from "@mui/material";
import Theme from "./themes/Theme";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Home from "./pages/Home";
import QuestionsRepo from "./pages/QuestionsRepo";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import UserContextProvider from "./utils/UserContextUtil";
import SnackbarProvider from "./utils/SnackbarContextUtil";
import MatchPage from "./pages/MatchingPage/MatchPage";
import LoadingMatchPage from "./pages/MatchingPage/LoadingMatchPage";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
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
            <UserContextProvider.Provider value={value}>
              <SnackbarProvider>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/questions" element={<QuestionsRepo />} />
                  <Route path="/matchpage" element={<MatchPage />} />
                  <Route path="/matching" element={<LoadingMatchPage />} />
                </Routes>
              </SnackbarProvider>
            </UserContextProvider.Provider>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
}

export default App;
