import "./App.css";
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
import { AuthProvider } from "./utils/AuthContextUtil";
import ProtectedRoute from "./utils/ProtectedRouteUtil";

function App() {
  return (
    <>
      <Theme>
        <Grid container>
          <Grid item xs={12}>
            <SnackbarProvider>
              <div>
                <div>
                  <AuthProvider>
                    <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route
                        path="/home"
                        element={
                          <ProtectedRoute>
                            <Home />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <ProfilePage />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/questions"
                        element={
                          <ProtectedRoute>
                            <QuestionsRepo />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/collaboration"
                        element={
                          <ProtectedRoute>
                            <CollaborationPage />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </AuthProvider>
                </div>
              </div>
            </SnackbarProvider>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
}

export default App;
