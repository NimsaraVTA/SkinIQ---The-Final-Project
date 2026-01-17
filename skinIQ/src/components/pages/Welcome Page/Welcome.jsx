import React from "react";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
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
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-light border-bottom shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary fs-4">SkinIQ</span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
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
              <div className="d-none d-lg-flex gap-2 text-muted ms-2">
                <Facebook size={18} />
                <Twitter size={18} />
                <Instagram size={18} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="container pt-5 mt-5">
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
      </section>

      <section className="container py-5" id="features">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Clinical Features</h2>
          <p className="text-muted">
            Cutting-edge technology designed for your skin's well-being.
          </p>
        </div>

        <div className="row g-4">
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
