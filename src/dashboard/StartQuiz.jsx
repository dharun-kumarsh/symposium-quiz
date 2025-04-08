import React, { useEffect, useState } from 'react';

const StartQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [layout, setLayout] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [bgImage, setBgImage] = useState('');

  const handleStartQuiz = async () => {
    if (!quizName) return alert('Please enter a quiz name.');

    try {
      const response = await fetch('https://api.sheetbest.com/sheets/ee34220b-70d8-4d1f-b6ed-9e93352f5018');
      const data = await response.json();
      const quizQuestions = data.filter(item => item.quiz_name.toLowerCase() === quizName.toLowerCase());

      if (quizQuestions.length === 0) return alert('Quiz not found.');

      setQuizData(quizQuestions);
      setLayout(quizQuestions[0].layout);
      setBgImage(quizQuestions[0].bg_image || 'default.jpg'); // Set background image from quiz data
      setIsQuizStarted(true);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      alert('Failed to load quiz.');
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = async () => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.crt_option) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      setShowScore(true);

      // Save the score
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const email = loggedInUser?.email || 'anonymous@example.com';
      const payload = {
        email,
        password: '', // leave blank or use a placeholder
        quiz: quizName,
        score: score + (selectedOption === currentQuestion.crt_option ? 1 : 0),
      };

      try {
        await fetch('https://api.sheetbest.com/sheets/411a4826-ef2d-497e-ab97-f484ba2419ab', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Error saving score:', err);
        alert('Failed to save your score.');
      }
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];

  const renderOptions = () => {
    const layoutStyle = layout === '2x2' ? 'grid-cols-2' : 'grid-cols-1';
    return (
      <div className={`grid ${layoutStyle} gap-4 mt-4`}>
        {[1, 2, 3, 4].map(num => {
          const opt = currentQuestion[`option${num}`];
          return (
            <button
              key={num}
              onClick={() => handleOptionSelect(opt)}
              className={`py-2 px-4 border rounded-md ${selectedOption === opt ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-90 rounded-xl shadow-md text-center">
        {!isQuizStarted ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Enter Quiz Name</h2>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="e.g. JavaScript Basics"
              className="w-full p-2 border rounded-md mb-4"
            />
            <button
              onClick={handleStartQuiz}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Start Quiz
            </button>
          </div>
        ) : showScore ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg">Your Score: {score} / {quizData.length}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Q{currentQuestion.q_no}. {currentQuestion.question}</h2>
            {renderOptions()}
            {selectedOption && (
              <button
                onClick={handleNext}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                {currentQuestionIndex + 1 === quizData.length ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartQuiz;
