import { useState } from 'react';
import { Tabs, Tab, Grid } from '@mui/material';

function VerticalNavBar({ onSelectTab, navigationTabs }) {
	const [value, setValue] = useState(0);

	const tabProps = (index) => {
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`,
		};
	};

	const handleChange = (event, newValue) => {
		onSelectTab(navigationTabs[newValue]);
		setValue(newValue);
	};

	return (
		<Grid item>
			<Tabs orientation="vertical" value={value} onChange={handleChange}>
				{navigationTabs.map((title, index) => (
					<Tab key={index} label={title} {...tabProps(index)} />
				))}
			</Tabs>
		</Grid>
	);
}

export default VerticalNavBar;
