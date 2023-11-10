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
import SnackbarProvider from "./utils/SnackbarContextUtil";
import CollaborationPage from "./pages/Collaboration/Collaboration/CollaborationPage";

function App() {
  return (
    <>
      <Theme>
        <Grid container>
          <Grid item xs={12}>
            <SnackbarProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/questions" element={<QuestionsRepo />} />
                <Route path="/collaboration" element={<CollaborationPage />} />
              </Routes>
            </SnackbarProvider>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
}

export default App;
