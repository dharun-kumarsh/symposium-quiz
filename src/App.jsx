import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import Dashboard from "./dashboard/Dashboard";
import CreateQuiz from "./dashboard/CreateQuiz";
import StartQuiz from "./dashboard/StartQuiz";
import Profile from "./dashboard/Profile";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/start-quiz" element={<StartQuiz />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  );
}

export default App;
