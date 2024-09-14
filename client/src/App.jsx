
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home/Home'
import SignUp from './Pages/Auth/SignUp'
import Login from './Pages/Auth/Login/Login'
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<div><Home /></div>} />
        <Route path="/login" element={<div><Login /></div>} />
        <Route path="/signup" element={<div><SignUp /></div>} />


      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
