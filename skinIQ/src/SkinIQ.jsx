import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/pages/Welcome Page/Welcome';
import AuthPage from './components/pages/Auth Page/AuthPage';
import DashboardLayout from './components/pages/Dashboard Page/DashboardLayout';
import AIChatLayout from "./components/pages/AIChatDashboard Page/AIChatLayout";
import ProfileLayout from "./components/pages/User Profile Page/ProfileLayout";
import AiSkinAnalysisLayout from "./components/pages/AISkinAnalysis Page/AiSkinAnalysisLayout";

const SkinIQ = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/ai-chat" element={<AIChatLayout />} />
        <Route path="/profile" element={<ProfileLayout />} />
        <Route path="/ai-skin-analysis" element={<AiSkinAnalysisLayout />}
        />
      </Routes>
    </Router>
  );
}

export default SkinIQ;
