import Question from './Question';

function QuestionList({ questions }) {
	/**const [questions, setQuestions] = useState([
    { id: 1, title: "question 1", category: "cat1", complexity: "easy", description: "aaa" },
    { id: 2, title: "question 2", category: "cat2", complexity: "easy", description: "bbb" },
  ]);*/

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Question No.</th>
						<th>Question Title</th>
						<th>Question Category</th>
						<th>Question Complexity</th>
						<th>Question Description</th>
					</tr>
				</thead>
				<tbody>
					{questions.map((question, index) => {
						return (
							<Question
								key={question.title}
								questionId={index + 1}
								question={question}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default QuestionList;
