function Question({ question, questionId }) {
	return (
		<tr>
			<td>{questionId}</td>
			<td>{question.title}</td>
			<td>{question.category}</td>
			<td>{question.complexity}</td>
			<td>{question.description}</td>
		</tr>
	);
}

export default Question;
