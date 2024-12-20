import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8088/api/v1/user/login", {
        email: loginEmail,
        password: loginPassword,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("jwtToken", token); // Store token securely
        navigate("/Session"); // Redirect to session page
      } else {
        setMessage("Login failed: Invalid credentials.");
      }
    } catch (error) {
      setMessage(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Connexion</h1>
        <p className="text-center text-gray-500 mb-6">
          Entrez votre adresse e-mail ci-dessous pour vous connecter
        </p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition"
        >
          Se connecter
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Mot de passe oublié ?
          </a>
        </p>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
