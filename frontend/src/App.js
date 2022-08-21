import { Routes, Route } from "react-router-dom";
import './App.css'
import EmailVerificationPage from "./pages/EmailVerificationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/user/:id/verify/:token" element={<EmailVerificationPage />} />  
    </Routes>
  );
}

export default App;
