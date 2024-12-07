import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleVerify = async () => {
    try {
      const response = await axios.post(`http://localhost:8088/forgotPassword/verifyOTP/${otp}/${email}`);
      setMessage(response.data);

      if (response.status === 200) {
        navigate("/reset-password", { state: { email } });
      }
    } catch (error) {
      setMessage(`Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Vérification OTP</h1>
        <p className="text-center text-gray-500 mb-6">Entrez le code OTP envoyé à votre adresse e-mail.</p>

        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Code OTP</label>
          <input
            id="otp"
            type="text"
            placeholder="Entrez le code OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button onClick={handleVerify} className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition">
          Vérifier le code OTP
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">{message}</p>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
