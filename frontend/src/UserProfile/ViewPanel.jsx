import Typography from '@mui/material/Typography';

function ViewPanel({ children }) {

    const navBarTabs = {
        'pastsubmissions': {
            componentName: <PastSubmissions/>,
        }
    }
	return (
		<div>
			<Box>
				<Typography>{children}</Typography>
			</Box>
		</div>
	);
}

export default ViewPanel;
