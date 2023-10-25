import { Stack, Typography } from '@mui/material';
import QuestionList from '../../components/QuestionList';

function PastSubmissions() {
	return (
		<div>
			<Stack alignItems="flex-start" direction="column" spacing={2}>
				<Typography variant="h4">Past Submissions</Typography>
				<QuestionList questions={[]} />
			</Stack>
		</div>
	);
}

export default PastSubmissions;
