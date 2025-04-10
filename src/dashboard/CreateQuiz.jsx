import React, { useState } from 'react';

const backgrounds = [
  './assets/bg1.jpg',
  './assets/bg2.jpg',
  './assets/bg3.jpg',
  './assets/bg4.jpg',
];

const CreateQuiz = () => {
  const [step, setStep] = useState(1);
  const [quizInfo, setQuizInfo] = useState({
    quiz_name: '',
    layout: '',
    bg: '',
    totalQuestions: 1,
  });

  const [questionData, setQuestionData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    crt_option: '',
  });

  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuizInfoChange = (e) => {
    const { name, value } = e.target;
    setQuizInfo((prev) => ({
      ...prev,
      [name]: name === 'totalQuestions' ? parseInt(value) : value,
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionSelect = (optionKey) => {
    setQuestionData((prev) => ({
      ...prev,
      crt_option: prev[optionKey],
    }));
  };

  const saveQuestionAndMoveNext = () => {
    const { question, option1, option2, option3, option4, crt_option } = questionData;
    if (!question || !option1 || !option2 || !option3 || !option4 || !crt_option) {
      alert('Please fill all fields and select the correct answer.');
      return;
    }

    const currentQuestion = {
      ...quizInfo,
      q_no: currentQuestionIndex + 1,
      ...questionData,
    };

    setQuestionsList((prev) => [...prev, currentQuestion]);

    if (currentQuestionIndex + 1 === quizInfo.totalQuestions) {
      handleSubmitQuiz([...questionsList, currentQuestion]);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionData({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        crt_option: '',
      });
    }
  };

  const handleSubmitQuiz = async (finalList) => {
    try {
      const response = await fetch(
        'https://api.sheetbest.com/sheets/ee34220b-70d8-4d1f-b6ed-9e93352f5018',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalList),
        }
      );

      if (response.ok) {
        alert('Quiz submitted successfully!');
        setQuizInfo({ quiz_name: '', bg: '', layout: '', totalQuestions: 1 });
        setQuestionsList([]);
        setCurrentQuestionIndex(0);
        setStep(1);
      } else {
        alert('Error submitting the quiz.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-3xl p-8 bg-[#111] border-2 border-pink-500 rounded-2xl shadow-[0_0_20px_#ec4899]">
        <h2 className="text-4xl font-bold mb-8 text-center text-pink-400 drop-shadow-[0_0_5px_#ec4899]">
          Create a Quiz
        </h2>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-1">Quiz Name</label>
              <input
                type="text"
                name="quiz_name"
                value={quizInfo.quiz_name}
                onChange={handleQuizInfoChange}
                className="w-full p-3 bg-black text-white border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Layout</label>
              <select
                name="layout"
                value={quizInfo.layout}
                onChange={handleQuizInfoChange}
                className="w-full p-3 bg-black text-white border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select Layout</option>
                <option value="4x1">4x1</option>
                <option value="2x2">2x2</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">No. of Questions</label>
              <input
                type="number"
                name="totalQuestions"
                value={quizInfo.totalQuestions}
                min="1"
                onChange={handleQuizInfoChange}
                className="w-full p-3 bg-black text-white border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-[0_0_10px_#ec4899] transition duration-300"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <>
            <h3 className="text-2xl font-semibold mb-6 text-pink-300 text-center">Choose Background</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {backgrounds.map((img, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setQuizInfo((prev) => ({ ...prev, bg: img }));
                    setStep(3);
                  }}
                  className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-transform duration-300 hover:scale-105 ${
                    quizInfo.bg === img
                      ? 'border-pink-500 shadow-[0_0_15px_#ec4899]'
                      : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`bg-${index + 1}`} className="w-full h-32 object-cover" />
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-xl font-semibold mb-4 mt-6 text-pink-300 text-center">
              Question {currentQuestionIndex + 1} of {quizInfo.totalQuestions}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-1">Question</label>
                <input
                  type="text"
                  name="question"
                  value={questionData.question}
                  onChange={handleQuestionChange}
                  className="w-full p-3 bg-black text-white border border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              {[1, 2, 3, 4].map((num) => {
                const opt = `option${num}`;
                const isSelected = questionData.crt_option === questionData[opt];
                return (
                  <div
                    key={opt}
                    className={`flex items-center space-x-3 p-3 rounded-md ${
                      isSelected ? 'border-2 border-pink-500 shadow-[0_0_10px_#ec4899]' : 'border border-pink-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="crt_option"
                      checked={isSelected}
                      onChange={() => handleOptionSelect(opt)}
                      className="accent-pink-500"
                    />
                    <input
                      type="text"
                      name={opt}
                      value={questionData[opt]}
                      onChange={handleQuestionChange}
                      className="w-full p-2 bg-black text-white border border-pink-300 rounded-md"
                      placeholder={`Option ${num}`}
                      required
                    />
                  </div>
                );
              })}

              <button
                onClick={saveQuestionAndMoveNext}
                className="w-full mt-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-[0_0_10px_#22c55e] transition duration-300"
              >
                {currentQuestionIndex + 1 === quizInfo.totalQuestions ? 'Submit Quiz' : 'Next Question'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;