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
  { title: "Detailed Reports", desc: "Get comprehensive PDF insights into your skin's hydration and texture.", icon: <FileText size={28} /> },
  { title: "Personalized Routines", desc: "AI-curated AM/PM regimens tailored specifically to your skin type.", icon: <Sparkles size={28} /> },
  { title: "Compatibility Check", desc: "Scan product ingredients to ensure they won't irritate your skin.", icon: <ShieldCheck size={28} /> },
  { title: "AI Chat Assistant", desc: "24/7 access to dermatological knowledge for your daily questions.", icon: <MessageSquare size={28} /> },
  { title: "Smart Reminders", desc: "Stay consistent with SMS notifications for your daily treatments.", icon: <Bell size={28} /> },
];

const Welcome = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="welcome-page-container" style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
      <nav className="navbar fixed-top bg-light border-bottom shadow-sm" style={{ zIndex: 100, width: '100vw', maxWidth: '100vw' }}>
        <div className="d-flex align-items-center justify-content-between" style={{ width: '100vw', maxWidth: '100vw', padding: '0 32px' }}>
          <span className="navbar-brand fw-bold text-primary fs-4">SkinIQ</span>
          <ul className="navbar-nav flex-row gap-3 mb-0 d-none d-lg-flex">
            <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
            <li className="nav-item"><a className="nav-link" href="#how">How It Works</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <div className="d-none d-lg-flex gap-2 align-items-center">
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
        </div>
        {/* Mobile menu overlay with custom options */}
        {menuOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ zIndex: 200, paddingTop: 0, background: 'rgba(255,255,255,0.5)' }}
          >
            <div style={{ width: '100vw', maxWidth: '100vw', height: '100vh', display: 'flex', justifyContent: 'flex-end', alignItems: 'stretch', position: 'relative' }}>
              <div style={{ width: '340px', maxWidth: '90vw', height: '100%', background: '#bed6ef', boxShadow: '-4px 0 24px rgba(44,123,229,0.08)', padding: '32px 24px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative' }}>
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
                <div style={{ height: 40 }} />
                <span className="navbar-brand fw-bold text-primary fs-4 mb-4 mt-2" style={{ alignSelf: 'flex-end', borderBottom: '1px solid #edf2f7', width: '100%', textAlign: 'right', paddingBottom: 8 }}>SkinIQ</span>
                <a href="#features" className="nav-link fw-bold mb-0" style={{ color: 'var(--text-main)', fontSize: '17px', alignSelf: 'flex-end', borderBottom: '1px solid #edf2f7', width: '100%', textAlign: 'right', padding: '12px 0' }} onClick={() => setMenuOpen(false)}>Features</a>
                <a href="#how" className="nav-link fw-bold mb-0" style={{ color: 'var(--text-main)', fontSize: '17px', alignSelf: 'flex-end', borderBottom: '1px solid #edf2f7', width: '100%', textAlign: 'right', padding: '12px 0' }} onClick={() => setMenuOpen(false)}>How It Works</a>
                <a href="#contact" className="nav-link fw-bold mb-0" style={{ color: 'var(--text-main)', fontSize: '17px', alignSelf: 'flex-end', borderBottom: '1px solid #edf2f7', width: '100%', textAlign: 'right', padding: '12px 0' }} onClick={() => setMenuOpen(false)}>Contact</a>
                <Link to="/auth?mode=signin" style={{ textDecoration: 'none', alignSelf: 'flex-end', width: '100%' }} onClick={() => setMenuOpen(false)}>
                  <div style={{ borderBottom: '1px solid #edf2f7', width: '100%', textAlign: 'right', padding: '12px 0' }}>
                    <Button variant="outline" size="md" style={{ width: '120px', color: 'var(--primary)', borderColor: 'var(--primary)', fontWeight: 500, float: 'right' }}>Sign In</Button>
                  </div>
                </Link>
                <Link to="/auth?mode=signup" style={{ textDecoration: 'none', alignSelf: 'flex-end', width: '100%' }} onClick={() => setMenuOpen(false)}>
                  <div style={{ borderBottom: '1px solid #edf2f7', width: '100%', textAlign: 'right', padding: '12px 0' }}>
                    <Button variant="primary" size="md" style={{ width: '120px', fontWeight: 500, float: 'right' }}>Sign Up</Button>
                  </div>
                </Link>
                <div className="d-flex gap-3 mt-4 mb-2" style={{ alignSelf: 'flex-end' }}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light)' }}><Facebook size={22} /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light)' }}><Twitter size={22} /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light)' }}><Instagram size={22} /></a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <section className="hero-section d-flex align-items-center justify-content-center min-vh-100" style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
        <div className="container-fluid" style={{ width: '100vw', maxWidth: '100vw', padding: '0 32px' }}>
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

      <section className="container-fluid py-5" id="features" style={{ width: '100vw', maxWidth: '100vw', padding: '0 32px' }}>
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