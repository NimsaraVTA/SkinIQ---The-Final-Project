import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
import "./Welcome.css"; 
import {
  Camera, UserCircle, FileText, Sparkles,
  ShieldCheck, MessageSquare, Bell,
  Facebook, Twitter, Instagram
} from "lucide-react";

const features = [
  { title: "AI Skin Analysis", desc: "Upload a photo for instant clinical-grade analysis of skin concerns.", icon: <Camera size={28} /> },
  { title: "Health Profile", desc: "Securely track your skin journey and history in one centralized dashboard.", icon: <UserCircle size={28} /> },
  { title: "Detailed Reports", desc: "Get comprehensive PDF insights into your skin's hydration and texture.", icon: <FileText size={28} /> },
  { title: "Personalized Routines", desc: "AI-curated AM/PM regimens tailored specifically to your skin type.", icon: <Sparkles size={28} /> },
  { title: "Compatibility Check", desc: "Scan product ingredients to ensure they won't irritate your skin.", icon: <ShieldCheck size={28} /> },
  { title: "AI Chat Assistant", desc: "24/7 access to dermatological knowledge for your daily questions.", icon: <MessageSquare size={28} /> },
  { title: "Smart Reminders", desc: "Stay consistent with SMS notifications for your daily treatments.", icon: <Bell size={28} /> },
];

const Welcome = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="welcome-page-container">
      <nav className="navbar fixed-top bg-light border-bottom shadow-sm" style={{ zIndex: 100 }}>
        <div className="container d-flex align-items-center justify-content-between">
          <span className="navbar-brand fw-bold text-primary fs-4">SkinIQ</span>

          {/* Hamburger icon for mobile */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            style={{ background: 'none', border: 'none', outline: 'none', padding: 8 }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2c7be5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Desktop nav */}
          <div className="d-none d-lg-flex align-items-center w-100 justify-content-between">
            <ul className="navbar-nav flex-row gap-3 mb-0">
              <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="#how">How It Works</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
            <div className="d-flex gap-2 align-items-center">
              <Link to="/auth?mode=signin" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
              <div className="d-flex gap-2 text-muted ms-2">
                <Facebook size={18} />
                <Twitter size={18} />
                <Instagram size={18} />
              </div>
            </div>
          </div>

          {menuOpen && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 bg-white d-lg-none"
              style={{ zIndex: 200, paddingTop: 70 }}
            >
              <div className="container">
                <ul className="navbar-nav flex-column gap-3 mb-4">
                  <li className="nav-item"><a className="nav-link fs-5" href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
                  <li className="nav-item"><a className="nav-link fs-5" href="#how" onClick={() => setMenuOpen(false)}>How It Works</a></li>
                  <li className="nav-item"><a className="nav-link fs-5" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
                </ul>
                <div className="d-flex flex-column gap-3 mb-4">
                  <Link to="/auth?mode=signin" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" size="md" style={{ width: '100%' }}>Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                    <Button variant="primary" size="md" style={{ width: '100%' }}>Sign Up</Button>
                  </Link>
                </div>
                <div className="d-flex gap-3 text-muted mb-2">
                  <Facebook size={22} />
                  <Twitter size={22} />
                  <Instagram size={22} />
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    padding: 8,
                    cursor: 'pointer',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2c7be5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="hero-section d-flex align-items-center justify-content-center min-vh-100">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                Beta Access Now Live
              </span>

              <h1 className="display-5 fw-bold mt-3">
                Revolutionize Your <span className="text-primary">Skin Health</span> with AI
              </h1>

              <p className="lead text-muted mt-3">
                Experience the future of dermatology. SkinIQ uses advanced computer vision
                to analyze and optimize your skincare routine with scientific precision.
              </p>

              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mt-4">
                <Button variant="primary" size="lg">Start Free Analysis</Button>
                <Button variant="outline" size="lg">How It Works</Button>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://www.skincenterofsouthmiami.com/wp-content/uploads/2018/06/Skin-Center-of-South-Miami-Facials-and-Skin-Care.jpg"
                alt="SkinIQ Diagnostics"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5" id="features">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Clinical Features</h2>
          <p className="text-muted">
            Cutting-edge technology designed for your skin's well-being.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {features.map((feature, idx) => (
            <div className="col-sm-6 col-lg-4" key={idx}>
              <Card className="feature-card h-100 text-center p-4 border-0 shadow-sm rounded-4">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-3"
                     style={{ width: 56, height: 56 }}>
                  {feature.icon}
                </div>
                <h5 className="fw-semibold">{feature.title}</h5>
                <p className="text-muted small">{feature.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Welcome;