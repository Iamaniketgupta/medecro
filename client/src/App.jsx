import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home/Home";

// import Login from './components/auth/Login'
import DocLogin from "./components/DoctorAuth/DocLogin";
import DocSignup from "./components/DoctorAuth/DocSignup";

import "react-toastify/dist/ReactToastify.css";

import SignUp from "./components/auth/Signup";
import Login from "./Pages/Auth/Login/Login";
import ClinicProfileView from "./Pages/Clinic/ClinicProfileView";
import ClinicRegistration from "./components/clinic/ClinicRegisteration";
import ProtectedRoute from "./components/ProtectedRoute";

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
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
