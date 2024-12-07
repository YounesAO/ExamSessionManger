import React from "react";
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Existing components
import LoginPage from "./components/Loginpage";
import ForgotPasswordPage from "./components/Forgotpass/ForgotPasswordPage";
import VerifyOtpPage from "./components/Forgotpass/VerifyOtpPage";
import ResetPasswordPage from "./components/Forgotpass/ResetPasswordPage";
import Session from "./components/Session";
import Dashboard from "./components/Dashboard";

// New pages
import Exams from "./components/Exams";
import Surveillance from "./components/Surveillance";
import Emploi from "./components/Emploi";
import Options from "./components/Options";
import Departements from "./components/Departements";
import Locaux from "./components/Locaux";

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/Session" element={<Session />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* New Routes */}
        <Route path="/exams" element={<Exams />} />
        <Route path="/surveillance" element={<Surveillance />} />
        <Route path="/emploi" element={<Emploi />} />
        <Route path="/options" element={<Options />} />
        <Route path="/departements" element={<Departements />} />
        <Route path="/locaux" element={<Locaux />} />
      </Routes>
    </Router>
  );
}

export default App;
