import { useState, useRef, useEffect } from 'react';
import QuestionList from './QuestionList';
import './App.css';

function App() {
	const storedQuestions = JSON.parse(localStorage.getItem('questions'));

	const [questions, setQuestions] = useState(
		storedQuestions !== null ? storedQuestions : []
	);

	/**
	 * { id: 1, title: "question 1", category: "cat1", complexity: "easy", description: "aaa" },
	 * { id: 2, title: "question 2", category: "cat2", complexity: "easy", description: "bbb" },
	 */

	const inputRefQuestionId = useRef(null);
	const inputRefTitle = useRef(null);
	const inputRefCategory = useRef(null);
	const inputRefComplexity = useRef(null);
	const inputRefDescription = useRef(null);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const id = Number(inputRefQuestionId.current.value);
		const title = inputRefTitle.current.value;
		const complexity = inputRefComplexity.current.value;
		const description = inputRefDescription.current.value;

		const isDuplicateQuestion =
			storedQuestions !== null &&
			storedQuestions.some((question) => question.title === title);

		if (isDuplicateQuestion) {
			// handle duplicate question
		} else {
			const newQuestion = {
				id,
				title,
				complexity,
				description,
			};

			setQuestions([...questions, newQuestion]);
			inputRefQuestionId.current.value = '';
			inputRefTitle.current.value = '';
			inputRefComplexity.current.value = '';
			inputRefDescription.current.value = '';
		}
	};

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);

	return (
		<>
			<h1>Peerprep</h1>
			<QuestionList questions={questions} />
			<form
				onSubmit={(evt) => {
					handleSubmit(evt);
				}}
			>
				<input
					type="text"
					placeholder="Question Id"
					ref={inputRefQuestionId}
				/>
				<input
					type="text"
					placeholder="Question Title"
					ref={inputRefTitle}
				/>
				<input
					type="text"
					placeholder="Question Category"
					ref={inputRefCategory}
				/>
				<select name="Question Complexity" ref={inputRefComplexity}>
					<option value="Easy">Easy</option>
					<option value="Medium">Medium</option>
					<option value="Hard">Hard</option>
				</select>
				<input
					type="text"
					placeholder="Question Description"
					ref={inputRefDescription}
				/>
				<button>add item</button>
			</form>
		</>
	);
}

export default App;
