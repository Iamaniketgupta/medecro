import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig/axiosConfig";
import Otp from "./DocVerifyOtp";

import Select from "react-select"; // Import react-select

const degreeOptions = [
  { value: "MBBS", label: "MBBS" },
  { value: "MD", label: "MD" },
  { value: "DO", label: "DO" },
  { value: "PhD", label: "PhD" },
  { value: "BDS", label: "BDS" },
  { value: "MDS", label: "MDS" },
  { value: "BHMS", label: "BHMS" },
  { value: "BAMS", label: "BAMS" },
  // Add more degree options here
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    gender: "",
    virtualFee: "",
    onsiteFee: "",
    experience: "",
    degrees: [], // Initialize as an empty array for multi-select
  });
  const [otpsent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Handle change for other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle multi-select change for degrees
  const handleDegreeChange = (selectedOptions) => {
    const selectedDegrees = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      degrees: selectedDegrees,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/doctor/register`, formData);
      if (response.status === 200) {
        setOtpSent(true);
        toast.success("🚀 OTP Sent to your Email");
      } else {
        toast.error(
          response?.data?.message || "Registration failed. Please try again."
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to register. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden relative">
      {/* Add Navbar component here if needed */}
      <div className="grid lg:grid-cols-2 overflow-clip">
        {/* IMG */}
        <div className="min-h-full w-full overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/991/652/non_2x/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
            alt=""
            className="object-cover h-full w-full"
          />
        </div>

        {/* FORM */}
        <div className="p-2 my-5">
          <div className="text-gray-800 max-w-md mx-auto shadow-lg p-5 rounded-lg">
            {!otpsent ? (
              <>
                <h1 className="text-center text-2xl md:text-3xl mb-8 font-semibold text-gray-800">
                  Join as Doctor 👨‍⚕️
                </h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  {currentStep === 1 && (
                    <>
                      {/* First Half - Basic Details */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm px-2 font-medium text-gray-700"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                          name="name"
                          id="name"
                          required
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm px-2 font-medium text-gray-700"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          autoComplete="off"
                          className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                          name="email"
                          id="email"
                          required
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2 relative">
                        <label
                          htmlFor="password"
                          className="block text-sm px-2 font-medium text-gray-700"
                        >
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                          name="password"
                          id="password"
                          required
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 top-5 flex items-center px-3 text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEye className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <FaRegEyeSlash
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      </div>

                      {/* Speciality and Gender */}
                      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                        <div className="flex-1 space-y-2">
                          <label
                            htmlFor="speciality"
                            className="block text-sm px-2 font-medium text-gray-700"
                          >
                            Speciality <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            autoComplete="off"
                            className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                            name="speciality"
                            id="speciality"
                            required
                            placeholder="Speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label
                            htmlFor="gender"
                            className="block text-sm px-2 font-medium text-gray-700"
                          >
                            Gender <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="gender"
                            required
                            value={formData.gender}
                            onChange={handleChange}
                            className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Virtual Fee and Onsite Fee */}

                      {/* Next Button */}
                      <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => {
                            if(!formData.name || !formData.email || !formData.password || !formData.speciality || !formData.gender){
                                toast.info("Please fill all the fields");
                                return;
                            }
                            
                            setCurrentStep(2)
                        }}
                      >
                        Next
                      </button>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      {/* Experience */}
                      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                        <div className="flex-1 space-y-2">
                          <label
                            htmlFor="virtualFee"
                            className="block text-sm px-2 font-medium text-gray-700"
                          >
                            Virtual Fee <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            autoComplete="off"
                            className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                            name="virtualFee"
                            id="virtualFee"
                            required
                            placeholder="Virtual Fee"
                            value={formData.virtualFee}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label
                            htmlFor="onsiteFee"
                            className="block text-sm px-2 font-medium text-gray-700"
                          >
                            Onsite Fee <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            autoComplete="off"
                            className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                            name="onsiteFee"
                            id="onsiteFee"
                            required
                            placeholder="Onsite Fee"
                            value={formData.onsiteFee}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="experience"
                          className="block text-sm px-2 font-medium text-gray-700"
                        >
                          Experience (years){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          autoComplete="off"
                          className="bg-gray-100 rounded-md px-4 py-2 text-gray-900 w-full"
                          name="experience"
                          id="experience"
                          required
                          placeholder="Experience in Years"
                          value={formData.experience}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Multi-Select Degree Dropdown */}
                      <div className="space-y-2">
                        <label className="block text-sm px-2 font-medium text-gray-700">
                          Degrees <span className="text-red-500">*</span>
                        </label>
                        <Select
                          isMulti
                          name="degrees"
                          options={degreeOptions} // Options array for degrees
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={degreeOptions.filter((option) =>
                            formData.degrees.includes(option.value)
                          )}
                          onChange={handleDegreeChange} // Handle multi-select change
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md mt-4"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </>
                  )}
                </form>
              </>
            ) : (
              <Otp formData={formData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
