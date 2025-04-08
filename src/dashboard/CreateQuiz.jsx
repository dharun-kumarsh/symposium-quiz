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
      crt_option: prev[optionKey],  // Save the actual text
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a Quiz</h2>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Quiz Name</label>
            <input
              type="text"
              name="quiz_name"
              value={quizInfo.quiz_name}
              onChange={handleQuizInfoChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Layout</label>
            <select
              name="layout"
              value={quizInfo.layout}
              onChange={handleQuizInfoChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            >
              <option value="">Select Layout</option>
              <option value="4x1">4x1</option>
              <option value="2x2">2x2</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">No. of Questions</label>
            <input
              type="number"
              name="totalQuestions"
              value={quizInfo.totalQuestions}
              min="1"
              onChange={handleQuizInfoChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <button
            onClick={() => setStep(2)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Choose Background</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {backgrounds.map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  setQuizInfo((prev) => ({ ...prev, bg: img }));
                  setStep(3);
                }}
                className={`cursor-pointer rounded-md overflow-hidden border-4 ${
                  quizInfo.bg === img ? 'border-blue-600' : 'border-transparent'
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
          <h3 className="text-xl font-semibold mb-4 mt-6">
            Question {currentQuestionIndex + 1} of {quizInfo.totalQuestions}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block font-medium">Question</label>
              <input
                type="text"
                name="question"
                value={questionData.question}
                onChange={handleQuestionChange}
                className="w-full mt-1 p-2 border rounded-md"
                required
              />
            </div>

            {[1, 2, 3, 4].map((num) => {
              const opt = `option${num}`;
              return (
                <div key={opt} className="flex items-center space-x-3">
                  <input
  type="radio"
  name="crt_option"
  checked={questionData.crt_option === questionData[opt]}
  onChange={() => handleOptionSelect(opt)}
/>

                  <input
                    type="text"
                    name={opt}
                    value={questionData[opt]}
                    onChange={handleQuestionChange}
                    className="w-full mt-1 p-2 border rounded-md"
                    placeholder={`Option ${num}`}
                    required
                  />
                </div>
              );
            })}

            <button
              onClick={saveQuestionAndMoveNext}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              {currentQuestionIndex + 1 === quizInfo.totalQuestions ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateQuiz;
