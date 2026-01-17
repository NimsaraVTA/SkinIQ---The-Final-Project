import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/pages/Welcome Page/Welcome';
import AuthPage from './components/pages/Auth Page/AuthPage';

const SkinIQ = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default SkinIQ;
