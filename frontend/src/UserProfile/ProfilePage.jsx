import { useState } from 'react';
import Stack from '@mui/material/Stack';
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
		<Stack direction="row" spacing={5}>
			<VerticalNavBar
				selectedTab={selectedTab}
				onSelectTab={setSelectedTab}
			/>
			<Box>{renderPanel()}</Box>
		</Stack>
	);
}

export default ProfilePage;
