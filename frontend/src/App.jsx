import './App.css';
import { Grid } from '@mui/material';
import Theme from './themes/Theme';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import QuestionsRepo from './pages/QuestionsRepo';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Theme>

					
					<Grid container>
						<Grid item xs={12}>
							<Routes>
								<Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<Home />} />
								<Route path="/profile" element={<ProfilePage />} />
								<Route path="/questions" element={<QuestionsRepo />} />
							</Routes>
						</Grid>
					</Grid>

			</Theme>
		</>
	);
}

export default App;
