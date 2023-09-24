import { useState } from 'react';
import Grid from '@mui/material/Grid';
import VerticalNavBar from './VerticalNavBar';
import PastSubmissions from './PastSubmissions';
import EditProfile from './EditProfile';
import Settings from './Settings';
import Box from '@mui/material/Box';

function ProfilePage() {
	const [selectedTab, setSelectedTab] = useState('pastsubmissions');

	const renderPanel = () => {
		switch (selectedTab) {
			case 'pastsubmissions':
				return <PastSubmissions />;
			case 'editprofile':
				return <EditProfile />;
			case 'settings':
				return <Settings />;
			default:
				return null;
		}
	};

	return (
		<Grid container spacing={5}>
			<Grid item xs={3}>
				<VerticalNavBar
					selectedTab={selectedTab}
					onSelectTab={setSelectedTab}
				/>
			</Grid>
			<Grid item xs={9}>
				{renderPanel()}
			</Grid>
		</Grid>
	);
}

export default ProfilePage;
