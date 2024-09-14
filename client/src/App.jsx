
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home/Home'

import Login from './components/auth/Login'
import SignUp from './components/auth/Signup'
import DocLogin from "./components/DoctorAuth/DocLogin";
import DocSignup from "./components/DoctorAuth/DocSignup";

import 'react-toastify/dist/ReactToastify.css';

import SignUp from './Pages/Auth/SignUp'
import Login from './Pages/Auth/Login/Login'
import 'react-toastify/dist/ReactToastify.css';
import ClinicProfileView from './Pages/Clinic/ClinicProfileView'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<div><Home /></div>} />
        <Route path='/login' element={<div><Login /></div>} />
        <Route path='/signup' element={<div><SignUp /></div>} />
        <Route path='/doc/login' element={<div><DocLogin /></div>} />
        <Route path='/doc/Signup' element={<div><DocSignup /></div>} />
        <Route path="/login" element={<div><Login /></div>} />
        <Route path="/signup" element={<div><SignUp /></div>} />
        <Route path="/clinic/profile/:clinicId" element={<div><ClinicProfileView /></div>} />



      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
