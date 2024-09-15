
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home/Home'


import DocLogin from "./components/DoctorAuth/DocLogin";
import DocSignup from "./components/DoctorAuth/DocSignup";

import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Pages/Auth/SignUp/SignUp'
import Login from './Pages/Auth/Login/Login'
import 'react-toastify/dist/ReactToastify.css';
import ClinicProfileView from './Pages/Clinic/ClinicProfileView'
import Dashboard from './Pages/Admin/Dashboard';
import AdminPanel from './Pages/Admin/AdminPanel';
import PatientsRecords from './Pages/Admin/PatientsRecords';
import Chat from './Pages/Admin/Chat';
import AssignPrescription from './Pages/Admin/AssignPrescription';
import Profile from './Pages/Admin/Profile';
import ViewPatientRecordInfo from './Pages/Admin/components/PatientRecords/Pages/ViewPatientRecordInfo';

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

        {/* Admin */}
        <Route path="/clinic/dashboard" element={<AdminPanel>< Dashboard/></AdminPanel>} />
        <Route path="/clinic/records" element={<AdminPanel>< PatientsRecords/></AdminPanel>} />
        <Route path="/clinic/records/patient/:patientId" element={<AdminPanel><ViewPatientRecordInfo/></AdminPanel>} />

        <Route path="/clinic/chat" element={<AdminPanel>< Chat/></AdminPanel>} />
        <Route path="/clinic/prescription" element={<AdminPanel>< AssignPrescription/></AdminPanel>} />
        <Route path="/clinic/profile" element={<AdminPanel>< Profile/></AdminPanel>} />


      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
