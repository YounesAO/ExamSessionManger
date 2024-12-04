import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8088/forgotPassword/verfication/${email}`);
      setMessage(response.data);

      if (response.status === 200) {
        navigate("/verify-otp", { state: { email } });
      }
    } catch (error) {
      setMessage(`Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Mot de passe oublié</h1>
        <p className="text-center text-gray-500 mb-6">Entrez votre adresse e-mail pour récupérer votre mot de passe.</p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button onClick={handleSubmit} className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition">
          Soumettre
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">{message}</p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
