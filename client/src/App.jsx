
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<div><Home /></div>} />


      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
