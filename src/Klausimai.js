import React, { useState, useEffect } from 'react';
import questions from './klausimai.json';

const Klausimai = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {

    setData(questions.questions);
  }, []);

  useEffect(() => {
    if (searchTerm) {

      const filteredResults = data.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.options[item.correct_answer]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [searchTerm, data]);

  return (

    <div>
      <input
        type="text"
        placeholder="Ieškoti..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-bar'
      />

      {results.length > 0 ? (
        results.map((item, index) => <div key={index}><b>{item.question}</b><br />{item.options[item.correct_answer]}</div>)
      ) : (
        <div>
          <p>Visi klausimai</p>
          <ul>
            {questions.questions.map((question) => (
              <li key={question.id}>
                <p>
                  <b>Klausimas:</b> {question.question}
                  <br />
                  {question.image && (
                    <img className="responsive-image"
                      src={`/testai/images/image${question.id}.png`}
                      alt="Question Illustration"
                    />
                  )}
                  <b>Atsakymas:</b> {question.options[question.correct_answer]}

                </p>


              </li>
            ))}
          </ul>

        </div>
      )}
    </div>

  );
};

export default Klausimai;