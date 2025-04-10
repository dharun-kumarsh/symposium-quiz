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
      setBgImage(quizQuestions[0].bg_image || 'default.jpg');
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

      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const email = loggedInUser?.email || 'anonymous@example.com';
      const payload = {
        email,
        password: '',
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
              className={`py-3 px-4 rounded-lg border-2 text-lg font-semibold transition-all duration-300
                ${
                  selectedOption === opt
                    ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_#60a5fa]'
                    : 'bg-black text-neonGreen border-green-400 hover:scale-105 hover:shadow-[0_0_12px_#22c55e]'
                }`}
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
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-3xl w-full p-8 rounded-2xl border-2 border-pink-500 shadow-[0_0_40px_#ec4899] bg-black bg-opacity-90 text-center text-white transition-all duration-300">
        {!isQuizStarted ? (
          <div>
            <h2 className="text-4xl font-extrabold mb-6 text-pink-400 drop-shadow-[0_0_15px_#f472b6]">Enter Quiz Name</h2>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="e.g. JavaScript Basics"
              className="w-full p-3 mb-6 rounded-md bg-black text-white border-2 border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 py-3 px-8 rounded-full text-white text-lg font-bold shadow-[0_0_15px_#f9a8d4] hover:scale-105 hover:shadow-[0_0_30px_#fb7185] transition-all duration-300"
            >
              🚀 Start Quiz
            </button>
          </div>
        ) : showScore ? (
          <div>
            <h2 className="text-4xl font-bold mb-4 text-pink-400 drop-shadow-[0_0_10px_#f472b6]">🎉 Quiz Completed!</h2>
            <p className="text-2xl text-white">Your Score: <span className="text-pink-300">{score}</span> / {quizData.length}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-pink-300 drop-shadow-[0_0_8px_#f9a8d4]">
              Q{currentQuestion.q_no}. {currentQuestion.question}
            </h2>
            {renderOptions()}
            {selectedOption && (
              <button
                onClick={handleNext}
                className="mt-6 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 text-white px-10 py-3 rounded-full font-bold text-lg shadow-[0_0_15px_#f472b6] hover:scale-105 hover:shadow-[0_0_25px_#f9a8d4] transition-all duration-300"
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