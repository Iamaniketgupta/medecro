
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home/Home'
import Login from './components/auth/Login'
import SignUp from './components/auth/Signup'
import DocLogin from "./components/DoctorAuth/DocLogin";
import DocSignup from "./components/DoctorAuth/DocSignup";

import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<div><Home /></div>} />
        <Route path='/login' element={<div><Login /></div>} />
        <Route path='/signup' element={<div><SignUp /></div>} />
        <Route path='/doc/login' element={<div><DocLogin /></div>} />
        <Route path='/doc/Signup' element={<div><DocSignup /></div>} />


      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
