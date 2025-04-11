import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import './StartQuiz.css'; 

function StartQuiz() {
  const [quizName, setQuizName] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [layout, setLayout] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [bgImage, setBgImage] = useState('/bg.png'); 

  const handleStartQuiz = async () => {
    if (!quizName) {
      toast.error('Please enter a quiz name.');
      return;
    }

    try {
      const response = await fetch('https://api.sheetbest.com/sheets/ee34220b-70d8-4d1f-b6ed-9e93352f5018');
      const data = await response.json();
      const quizQuestions = data.filter(item => item.quiz_name.toLowerCase() === quizName.toLowerCase());

      if (quizQuestions.length === 0) {
        toast.error('Quiz not found.');
        return;
      }

      setQuizData(quizQuestions);
      setLayout(quizQuestions[0].layout);
      setBgImage(quizQuestions[0].bg_image || '/bg.png');
      setIsQuizStarted(true);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      toast.error('Failed to load quiz.');
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
        toast.success('Score saved successfully!');
      } catch (err) {
        console.error('Error saving score:', err);
        toast.error('Failed to save your score.');
      }
    }
  };

  const renderOptions = () => {
    const layoutStyle = layout === '2x2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1';
    return (
      <div className={`grid ${layoutStyle} gap-4 mt-4`}>
        {[1, 2, 3, 4].map(num => {
          const opt = quizData[currentQuestionIndex][`option${num}`];
          return (
            <motion.button
              key={num}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(opt)}
              className={`py-3 px-4 rounded-lg border-2 text-lg font-semibold transition-all duration-300
                ${
                  selectedOption === opt
                    ? 'bg-neonBlue/20 text-white border-neonBlue shadow-neonBlue'
                    : 'bg-black/50 text-neonGreen border-neonGreen hover:shadow-neonGreen'
                }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-blend-overlay p-4" style={{ backgroundImage: `url(${bgImage})` }}>
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-8 rounded-2xl border-2 border-blue-500 bg-black/80 backdrop-blur-sm shadow-neonBlue arcade-theme"
        >
          {!isQuizStarted ? (
            <div>
              <div className="flex items-center justify-center gap-3 mb-8">
                <PlayCircle className="w-8 h-8 text-blue-500" />
                <h2 className="text-2xl font-bold text-blue-500">Start Quiz</h2>
              </div>
              <input
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Enter quiz name"
                className="w-full px-4 py-3 rounded-lg border-2 border-blue-500 bg-black/50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 mb-6"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartQuiz}
                className="group w-full bg-black border-2 border-blue-500 text-blue-500 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-black hover:shadow-blue-500 flex items-center justify-center gap-2"
              >
                <span>Start Quiz</span>
                <Sparkles className="w-5 h-5 group-hover:text-black transition-colors duration-300" />
              </motion.button>
            </div>
          ) : showScore ? (
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4 text-blue-500">Quiz Completed!</h2>
              <p className="text-2xl text-white">
                Your Score: <span className="text-blue-500 font-bold">{score}</span> / {quizData.length}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-green-500">
                Question {currentQuestionIndex + 1}
              </h2>
              {renderOptions()}
              {selectedOption && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="mt-6 w-full bg-green-500 border-2 border-green-500 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-green-600"
                >
                  {currentQuestionIndex + 1 === quizData.length ? 'Finish' : 'Next'}
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default StartQuiz;
