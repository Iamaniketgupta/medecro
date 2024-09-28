import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import PDashboard from "./Pages/Patient/PDashboard";
import ChatInbox from "./Pages/Admin/components/Chat/ChatInbox";
import ChatPage from "./Pages/Admin/components/Chat/ChatPage";
import PAdminPanel from "./Pages/Patient/PAdminPanel";
import Reports from "./Pages/Patient/Reports";
import ViewReport from "./Pages/Patient/ViewReport";
import PChat from "./Pages/Patient/Chat";
import AllClinics from "./Pages/Home/components/AllClinics";
import ReportSum from "./Pages/Home/components/ReportSum";
import { useDispatch, useSelector } from "react-redux";
import BookAppointment from "./Pages/Patient/AppointmentBooking";
import BookVirtualAppointment from "./Pages/Patient/VirtualAppointmentBooking"
import AddSlot from "./Pages/Admin/components/Add-Slot/AddSlot";
import AddVirtualSlot from "./Pages/Admin/components/Add-Slot/AddVirtualSlot";
import VideoCallComponent from "./Pages/VideoCall/VideoCallComponent";
import SlotAdd from "./Pages/Admin/components/Add-Slot/SlotAdd";
import { useEffect } from "react";
import axiosInstance from "./axiosConfig/axiosConfig";
import { login } from "./store/authSlice";
import UserProfile from "./Pages/Patient/components/Userprofile";

function App() {
  const user = useSelector(state=>state.auth.user);
  const type = useSelector(state=>state.auth.type);
  console.log({user , type});
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const fetchUser = async()=>{
    try {
      const res = await axiosInstance(`/users/getuser`);
      if(res.data){
        
        return {user : res.data.data , type:"user"}
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  const fetchDoctor = async()=>{
    try {
      const res = await axiosInstance(`/doctor/getdoctor`);
      if(res.data){
        return {user : res.data.data , type:"doctor"}
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }


  const fetchUserForRedux = async(req,res)=>{
    const accessToken = localStorage.getItem("accessToken");
    console.log({accessToken})
    if (accessToken) {
      const {user , type} = await fetchUser() || await fetchDoctor();
      if(user){
        dispatch(login({user , type}))
      }
    }
  }

  useEffect(() => {
    if(!user){
      fetchUserForRedux()
    }
    
  }, [user])
  
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all/clinics" element={<AllClinics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/doc/login" element={<DocLogin />} />
        <Route path="/doc/Signup" element={<DocSignup />} />
        <Route
          path="/clinic/profile/:clinicId"
          element={<ClinicProfileView />}
        />
        <Route path="/clinic/profile/:clinicId/:SlotId" element={<BookAppointment/>} />
        
        <Route path="/clinic/profile/:clinicId/virtual/:SlotId" element={<BookVirtualAppointment/>} />
        
        <Route path="/clinic/register" element={<ClinicRegistration />} />

        {/* Admin */}
       <Route path="/clinic/dashboard" element={<AdminPanel>< Dashboard /></AdminPanel>} />
        <Route path="/clinic/records" element={<AdminPanel>< PatientsRecords /></AdminPanel>} />
        <Route path="/clinic/records/patient/:patientId" element={<AdminPanel><ViewPatientRecordInfo /></AdminPanel>} />

        <Route path="/clinic/chat" element={<AdminPanel>< Chat /></AdminPanel>} />
        <Route path="/clinic/prescription" element={<AdminPanel>< AssignPrescription /></AdminPanel>} />
        <Route path="/clinic/profile" element={<AdminPanel>< Profile /></AdminPanel>} />
        <Route path="/clinic/chat" element={<AdminPanel>< Chat/></AdminPanel>} />
        <Route path="/clinic/chat/:id" element={<AdminPanel>< ChatPage/></AdminPanel>} />
        <Route path="/clinic/add-slot" element={<AdminPanel>< SlotAdd /></AdminPanel>} />
        
        <Route path="/clinic/add-virtual-slot" element={<AdminPanel>< AddVirtualSlot /></AdminPanel>} />
        {/* Patient Routes */}

        <Route path="/patient/dashboard" element={<PAdminPanel>< PDashboard /></PAdminPanel>} />
        <Route path="/patient/reports" element={<PAdminPanel>< Reports /></PAdminPanel>} />
        <Route path="/patient/chat" element={<PAdminPanel>< PChat /></PAdminPanel>} />
        <Route path="/patient/report/:reportId" element={<PAdminPanel><ViewReport /></PAdminPanel>} />
        <Route path="/patient/summarise" element={<ReportSum/>}/>
        <Route path="/patient/profile" element={<PAdminPanel>< UserProfile /></PAdminPanel>} />


        {/* Video call Routes */}
        <Route path="/vc/:roomID" element={<VideoCallComponent />} />

                                                 
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
