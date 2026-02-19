import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./AuthPage.css";

import { auth } from "../../services/firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search || location.search);
      return p.get("mode") === "signup";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setIsSignUp(p.get("mode") === "signup");
  }, [location.search]);

  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const signInRef = useRef(null);
  const signUpRef = useRef(null);

  const clearErrors = () => setErrors({});

  const isMobileValid = (phone) => {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 8;
  };

  const handleVerify = () => {
    clearErrors();
    if (!mobile) {
      setErrors({ mobile: "Please enter your mobile number." });
      setShowOtp(false);
      return;
    }
    if (!isMobileValid(mobile)) {
      setErrors({ mobile: "Please enter a valid mobile number." });
      setShowOtp(false);
      return;
    }
    setShowOtp(true);
  };

  const handleConfirmOtp = () => {
    if (!otp.trim()) {
      setErrors((prev) => ({
        ...prev,
        otp: "Please enter the verification code.",
      }));
      return;
    }
    // OTP is UI-only for now
  };

  // MAIN AUTH HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    const form = e.currentTarget;
    const email = form.username?.value?.trim();
    const password = form.password?.value?.trim();

    const newErrors = {};

    if (!email) newErrors.username = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    if (isSignUp) {
      if (!mobile) newErrors.mobile = "Mobile number is required.";
      else if (!isMobileValid(mobile))
        newErrors.mobile = "Please enter a valid mobile number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/dashboard");
    } catch (error) {
      setErrors({
        password: error.message.replace("Firebase:", "").trim(),
      });
    }
  };

  const handleSwitch = (toSignUp) => {
    clearErrors();
    setShowOtp(false);
    setOtp("");
    if (toSignUp) {
      signInRef.current?.reset();
    } else {
      signUpRef.current?.reset();
      setMobile("");
    }
    setIsSignUp(toSignUp);
  };

  return (
    <div className="auth-container">
      <div className="left">
        <h1>SkinIQ</h1>
        <p className="intro">
          Welcome to SkinIQ — Your AI-Powered Skin Health Monitoring and
          Personalized Care Platform
        </p>
      </div>

      <div className="right">
        <div className="auth-forms">
          <div className="tab-toggle">
            <button
              className={!isSignUp ? "active" : ""}
              onClick={() => handleSwitch(false)}
              type="button"
            >
              Sign In
            </button>
            <button
              className={isSignUp ? "active" : ""}
              onClick={() => handleSwitch(true)}
              type="button"
            >
              Sign Up
            </button>
          </div>

          <div className={`form-slider ${isSignUp ? "signUp" : ""}`}>
            {/* SIGN IN */}
            <form ref={signInRef} className="panel" onSubmit={handleSubmit}>
              <h3>Welcome Back</h3>

              <input
                name="username"
                className="input"
                placeholder="Email"
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}

              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}

              <button className="action" type="submit">
                Sign In
              </button>
            </form>

            <form ref={signUpRef} className="panel" onSubmit={handleSubmit}>
              <h3>Create Account</h3>

              <input
                name="username"
                className="input"
                placeholder="Email"
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}

              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password (min 6 chars)"
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}

              <div className="phone-verify">
                <PhoneInput
                  country={"us"}
                  value={mobile}
                  onChange={setMobile}
                  inputStyle={{ width: "100%" }}
                />
                {errors.mobile && (
                  <div className="error">{errors.mobile}</div>
                )}
                <button
                  type="button"
                  className="verify-btn"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </div>

              {showOtp && (
                <div className="otp-row">
                  <input
                    className="otp-input"
                    placeholder="Enter code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    type="button"
                    className="otp-action"
                    onClick={handleConfirmOtp}
                  >
                    Confirm
                  </button>
                </div>
              )}

              <button className="action" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default AuthPage;
