import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Signup from './auth/SignUp'

function App() {

  return (
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Routes>
    </div>
  )
}

export default App
