import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./AuthPage.css";

import { auth } from "../../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
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
  const [showPopup, setShowPopup] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const signInRef = useRef(null);
  const signUpRef = useRef(null);

  const clearErrors = () => {
    setErrors({});
    setResetMessage("");
  };

  const getFirebaseErrorMessage = (code) => {
    const messages = {
      "auth/email-already-in-use":
        "This email is already registered. Please sign in instead.",
      "auth/invalid-email":
        "Please enter a valid email address.",
      "auth/user-not-found":
        "No account found with this email.",
      "auth/wrong-password":
        "Incorrect password. Please try again.",
      "auth/weak-password":
        "Password should be at least 6 characters long.",
      "auth/too-many-requests":
        "Too many attempts. Please try again later.",
      "auth/network-request-failed":
        "Network error. Please check your internet connection.",
      "auth/invalid-credential":
        "Invalid email or password.",
    };

    return messages[code] || "Something went wrong. Please try again.";
  };

  const isMobileValid = (phone) => {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 8;
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
  clearErrors();

  const email =
    signInRef.current?.username?.value?.trim() || "";

  if (!email) {
    setErrors({ username: "Please enter your email first." });
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);

    setResetMessage(
      "Password reset email sent! Please check your inbox."
    );

    setTimeout(() => {
      setResetMessage("");
    }, 10000);

  } catch (error) {
    setErrors({ username: getFirebaseErrorMessage(error.code) });
  }
  };

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

      if (!acceptTerms)
        newErrors.terms = "You must accept the terms and conditions.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendEmailVerification(userCredential.user);

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);

        handleSwitch(false);
        return;
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (!userCredential.user.emailVerified) {
          setErrors({
            username: "Please verify your email before logging in.",
          });
          return;
        }
      }

      navigate("/dashboard");
    } catch (error) {
      const friendlyMessage = getFirebaseErrorMessage(error.code);

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email" ||
        error.code === "auth/email-already-in-use"
      ) {
        setErrors({ username: friendlyMessage });
      } else {
        setErrors({ password: friendlyMessage });
      }
    }
  };

  const handleSwitch = (toSignUp) => {
    clearErrors();
    setShowOtp(false);
    setOtp("");
    setAcceptTerms(false);
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
      {showPopup && (
        <div className="popup-message">
          Verification email sent! Please check your inbox.
        </div>
      )}

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

              <input name="username" className="input" placeholder="Email" />
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

              <div
                onClick={handleForgotPassword}
                style={{
                  textAlign: "right",
                  fontSize: "14px",
                  color: "#007bff",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                Forgot password?
              </div>

              <button className="action" type="submit">
                Sign In
              </button>

              {resetMessage && (
                <div className="success-message">
                  ✅ {resetMessage}
                </div>
              )}
            </form>

            {/* SIGN UP */}
            <form ref={signUpRef} className="panel" onSubmit={handleSubmit}>
              <h3>Create Account</h3>

              <input name="username" className="input" placeholder="Email" />
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
              </div>

              <div className="terms">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="terms-text">
                  I agree to the Terms & Conditions and Privacy Policy of
                  SkinIQ.
                </span>
              </div>
              {errors.terms && (
                <div className="error">{errors.terms}</div>
              )}

              <button
                className="action"
                type="submit"
                disabled={!acceptTerms}
                style={{
                  opacity: acceptTerms ? 1 : 0.6,
                  cursor: acceptTerms ? "pointer" : "not-allowed",
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
