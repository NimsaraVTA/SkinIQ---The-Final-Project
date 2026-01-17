import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/pages/Welcome Page/Welcome';
import AuthPage from './components/pages/Auth Page/AuthPage';
import DashboardLayout from './components/pages/Dashboard Page/DashboardLayout';
import AIChatLayout from "./components/pages/AIChatDashboard Page/AIChatLayout";

const SkinIQ = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/ai-chat" element={<AIChatLayout />} />
      </Routes>
    </Router>
  );
}

export default SkinIQ;
