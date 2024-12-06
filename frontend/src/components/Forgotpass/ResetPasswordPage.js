import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleResetPassword = async () => {
    if (password !== repeatPassword) {
      setMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8088/forgotPassword/changePassword/${email}`, {
        password,
        repeatPassword,
      });
      setMessage(response.data.message);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setMessage(`Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Réinitialisation du mot de passe</h1>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Entrez un nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700 mb-1">Répétez le mot de passe</label>
          <input
            id="repeatPassword"
            type="password"
            placeholder="Répétez le nouveau mot de passe"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button onClick={handleResetPassword} className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition">
          Réinitialiser le mot de passe
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">{message}</p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
