function Question({ question }) {
  return (
    <li key={question.id}>
      {question.title} - {question.complexity}
      <p>{question.description}</p>
    </li>
  );
}

export default Question;
