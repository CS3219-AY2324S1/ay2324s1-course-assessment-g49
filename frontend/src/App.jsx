import { useState, useRef, useEffect } from 'react'
import QuestionList from './QuestionList'
import './App.css'

function App() {
  
  const storedQuestions = JSON.parse(localStorage.getItem('questions'))

  const [questions, setQuestions] = useState(storedQuestions)

  /**
   * { id: 1, title: "question 1", complexity: "easy", description: "aaa" },
    { id: 2, title: "question 2", complexity: "easy", description: "bbb" },
   */

  const inputRefQuestionId = useRef(null)
  const inputRefTitle = useRef(null)
  const inputRefComplexity = useRef(null)
  const inputRefDescription = useRef(null)
  
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const question = {id: Number(inputRefQuestionId.current.value), title: inputRefTitle.current.value, complexity: inputRefComplexity.current.value, description: inputRefDescription.current.value}
        setQuestions([...questions, question])
        inputRefQuestionId.current.value = ''
        inputRefTitle.current.value = ''
        inputRefComplexity.current.value = ''
        inputRefDescription.current.value = ''
    }

    useEffect(() => {
      localStorage.setItem('questions', JSON.stringify(questions))
    }, [questions])

  return (
    <>
    <h1>Peerprep</h1>
    <QuestionList questions={questions}/>
    <form onSubmit={(evt) => {handleSubmit(evt)}}>
            <input
            type='text'
            placeholder='Question Id'
            ref={inputRefQuestionId}
            />
            <input
            type='text'
            placeholder='Question Title'
            ref={inputRefTitle}
            />
            <input
            type='text'
            placeholder='Question Complexity'
            ref={inputRefComplexity}
            />
            <input
            type='text'
            placeholder='Question Description'
            ref={inputRefDescription}
            />
            <button>add item</button>
        </form>
    </>
  )
}

export default App
