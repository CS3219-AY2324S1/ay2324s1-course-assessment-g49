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
		const question = {
			id: Number(inputRefQuestionId.current.value),
			title: inputRefTitle.current.value,
			category: inputRefCategory.current.value,
			complexity: inputRefComplexity.current.value,
			description: inputRefDescription.current.value,
		};
		setQuestions([...questions, question]);
		inputRefQuestionId.current.value = '';
		inputRefTitle.current.value = '';
		inputRefCategory.current.value = '';
		inputRefComplexity.current.value = '';
		inputRefDescription.current.value = '';
	};

	const handleDelete = (id) => {
		const updatedList = questions.filter(item => item.id !== id);
		setQuestions(updatedList);
		localStorage.setItem("questions", JSON.stringify(updatedList));
	}

	useEffect(() => {
		localStorage.setItem('questions', JSON.stringify(questions));
	}, [questions]);

	return (
		<>
			<h1>Peerprep</h1>
			<QuestionList questions={questions} onDelete = {handleDelete}/>
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
				<input
					type="text"
					placeholder="Question Complexity"
					ref={inputRefComplexity}
				/>
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
