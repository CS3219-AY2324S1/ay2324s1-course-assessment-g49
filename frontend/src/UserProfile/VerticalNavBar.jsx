import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function VerticalNavBar({ onSelectTab }) {
	const [value, setValue] = useState(0);

	const tabProps = (index) => {
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`,
		};
	};

	const handleChange = (event, newValue) => {
		onSelectTab(navigationTabs[newValue].tab);
		setValue(newValue);
	};
	const navigationTabs = [
		{
			tab: 'pastsubmissions',
			title: 'Past Submissions',
		},
		{
			tab: 'editprofile',
			title: 'Edit Profile',
		},
		{
			tab: 'settings',
			title: 'Settings',
		},
	];

	return (
		<Box>
			<Tabs
				orientation="vertical"
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
			>
				{navigationTabs.map((object, index) => (
					<Tab
						key={object.tab}
						label={object.title}
						{...tabProps(index)}
					/>
				))}
			</Tabs>
		</Box>
	);
}

export default VerticalNavBar;
