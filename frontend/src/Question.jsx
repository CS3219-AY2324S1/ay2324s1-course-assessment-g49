function Question({ question, onDelete }) {

	return (
		<tr>
			<td>{question.id}</td>
			<td>{question.title}</td>
			<td>{question.category}</td>
			<td>{question.complexity}</td>
			<td>{question.description}</td>
			<td><button onClick={() => onDelete(question.id)}>delete qn</button></td>
			
		</tr>
	);
}

export default Question;
