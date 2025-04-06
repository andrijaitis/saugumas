import './App.css';
import React, { useState } from 'react';
import questions from './klausimai.json';


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Testai = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  let shuffledQuestions = shuffleArray([...questions.questions]).slice(0, 10);
  const totalQuestions = shuffledQuestions.length;
  const [wrongQuestions, setWrongQuestions] = useState([])




  const handleSubmit = (index) => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex >= totalQuestions - 1) {
    }

    if (index === shuffledQuestions[currentQuestionIndex]?.correct_answer) {
      setScore(score + 1);
    }
    if (index !== shuffledQuestions[currentQuestionIndex]?.correct_answer) {
      setWrongQuestions([...wrongQuestions, shuffledQuestions[currentQuestionIndex]]);
    }

  };

  return (
    <div>

      {currentQuestionIndex <= totalQuestions - 1 ? (
        <>
          <p>   {'Klausimas ' + currentQuestionIndex + ' iš ' + shuffledQuestions.length}</p>
          <p>   {'Balai ' + score}</p>
          <h2>{shuffledQuestions[currentQuestionIndex]?.question}</h2>
          <ul>
            {shuffledQuestions[currentQuestionIndex]?.options.map((option, index) => (
              <li key={index} onClick={() => handleSubmit(index)} style={{ border: '0.25px solid gray',  cursor: 'pointer', backgroundColor: selectedOption === index ? 'lightgrey' : 'transparent' }}>
                {option}
              </li>
            ))}

            {shuffledQuestions[currentQuestionIndex]?.image && (
              <img className="responsive-image"
                src={`/saugumas/images/image${shuffledQuestions[currentQuestionIndex]?.id}.png`}
                alt="Question Illustration"
              />
            )}
          </ul>

        </>
      ) : (
        <div>
          <div>
            {score < 9 ? (

              <h2>Testas <span style={{ color: 'red' }}>neišlaikytas! </span>Jūsų rezultatas: {score}/{totalQuestions}</h2>
            ) : (
              <h2>Testas <span style={{ color: 'green' }}>išlaikytas!</span>Jūsų rezultatas: {score}/{totalQuestions}</h2>
            )}
            <button onClick={() => {
              setCurrentQuestionIndex(0);
              setSelectedOption(null);
              setScore(0);
              shuffledQuestions = shuffleArray([...questions.questions]).slice(0, 10);
              setWrongQuestions([]);
            }}>
              Pradėti iš naujo
            </button>
          </div>


          <div>
            {wrongQuestions.length > 0 && (
              <ul>
                {wrongQuestions.map((question, index) => (
                  <li key={index}>
                    <p><b>Klausimas:</b> {question.question}</p>
                    <p><b>Atsakymas:</b> {question.options[question.correct_answer]}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>




        </div>
      )}

    </div>

  );
}


export default Testai;
