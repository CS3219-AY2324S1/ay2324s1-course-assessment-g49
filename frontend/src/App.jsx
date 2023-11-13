import "./App.css";
import { Grid } from "@mui/material";
import Theme from "./themes/Theme";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Home from "./pages/Home";
import QuestionsRepo from "./pages/QuestionsRepo";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import SnackbarProvider from "./utils/SnackbarContextUtil";
import CollaborationPage from "./pages/Collaboration/Collaboration/CollaborationPage";
import JwtVerification from "./components/JwtVerification";
import LoadingMatchPage from "./pages/MatchingPage/LoadingMatchPage";
import MatchPage from "./pages/MatchingPage/MatchPage";

function App() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Theme>
        <Grid container>
          <Grid item xs={12}>
            <SnackbarProvider>
              <div>
                <div>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/questions" element={<QuestionsRepo />} />
                    <Route
                      path="/collaboration"
                      element={<CollaborationPage />}
                    />
                    <Route path="/matchpage" element={<MatchPage />} />
                    <Route path="/matching" element={<LoadingMatchPage />} />
                  </Routes>
                </div>
                <JwtVerification logout={logout} />
              </div>
            </SnackbarProvider>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
}

export default App;
