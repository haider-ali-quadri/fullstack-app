import { useState } from 'react'
import './JumbledWords.css'

const ORIGINAL_WORDS = ['react','vite','javascript','frontend','development'];

function jumbleWord(word) {
  const shuffled = word.split('').sort(() => Math.random() - 0.5);
  return shuffled.join('');
}

function JumbledWords() {
  const [jumbledWords, setJumbledWords] = useState(() => ORIGINAL_WORDS.map(word => jumbleWord(word)));
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = userInput.toLowerCase().trim();
    if (ORIGINAL_WORDS.includes(guess)) {
      setMessage('Correct!');
    } else {
      setMessage('Try again!');
    }
    setUserInput('');
  };
  
  return (
    <div className="jumbled-words">
      <h1>Jumbled Word Game</h1>
      <ul>
        {jumbledWords.map((word, index) => (<li key = {index}>{word}</li>))}
      </ul>
      <form onSubmit = {handleSubmit}>
        <input type = 'text' value = {userInput} placeholder="Your guess..." onChange={handleInputChange} />
        <button type = 'submit'>Submit</button>
      </form>

      {message && <p className='msg'>{message}</p>}

    </div>
  )
}

export default JumbledWords
