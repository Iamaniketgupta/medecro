import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home/Home";

// import Login from './components/auth/Login'
import DocLogin from "./components/DoctorAuth/DocLogin";
import DocSignup from "./components/DoctorAuth/DocSignup";

import "react-toastify/dist/ReactToastify.css";

import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ClinicProfileView from "./Pages/Clinic/ClinicProfileView";
import ClinicRegistration from "./components/clinic/ClinicRegisteration";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminPanel from "./Pages/Admin/AdminPanel";
import Profile from "./Pages/Admin/Profile";
import PatientsRecords from "./Pages/Admin/PatientsRecords";
import Chat from "./Pages/Admin/Chat";
import AssignPrescription from "./Pages/Admin/AssignPrescription";
import ViewPatientRecordInfo from "./Pages/Admin/components/PatientRecords/Pages/ViewPatientRecordInfo";

import Dashboard from './Pages/Admin/Dashboard';
import AdminPanel from './Pages/Admin/AdminPanel';
import PatientsRecords from './Pages/Admin/PatientsRecords';
import Chat from './Pages/Admin/Chat';
import AssignPrescription from './Pages/Admin/AssignPrescription';
import Profile from './Pages/Admin/Profile';
import ViewPatientRecordInfo from './Pages/Admin/components/PatientRecords/Pages/ViewPatientRecordInfo';
import ChatInbox from "./Pages/Admin/components/Chat/ChatInbox";
import ChatPage from "./Pages/Admin/components/Chat/ChatPage";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/doc/login" element={<DocLogin />} />
        <Route path="/doc/Signup" element={<DocSignup />} />
        <Route
          path="/clinic/profile/:clinicId"
          element={<ClinicProfileView />}
        />
        <Route path="/clinic/register" element={<ClinicRegistration />} />


        
        {/* Admin */}
        <Route path="/clinic/dashboard" element={<AdminPanel>< Dashboard/></AdminPanel>} />
        <Route path="/clinic/records" element={<AdminPanel>< PatientsRecords/></AdminPanel>} />
        <Route path="/clinic/records/patient/:patientId" element={<AdminPanel><ViewPatientRecordInfo/></AdminPanel>} />

        <Route path="/clinic/chat" element={<AdminPanel>< Chat/></AdminPanel>} />
<
        <Route path="/clinic/chat/:id" element={<AdminPanel>< ChatPage/></AdminPanel>} />
        <Route path="/clinic/prescription" element={<AdminPanel>< AssignPrescription/></AdminPanel>} />
        <Route path="/clinic/profile" element={<AdminPanel>< Profile/></AdminPanel>} />


                                                 
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
