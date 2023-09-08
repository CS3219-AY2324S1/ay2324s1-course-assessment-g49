function Question({ question }) {
  return (
    <tr>
      <td>{question.id}</td>
      <td>{question.title}</td>
      <td>{question.complexity}</td>
      <td>{question.description}</td>
    </tr>
  );
}

export default Question;
