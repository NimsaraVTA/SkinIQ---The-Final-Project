import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './AuthPage.css';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search || location.search);
      return p.get('mode') === 'signup';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setIsSignUp(p.get('mode') === 'signup');
  }, [location.search]);

  const [mobile, setMobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});

  const signInRef = useRef(null);
  const signUpRef = useRef(null);

  const clearErrors = () => setErrors({});

  const isMobileValid = (phone) => {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8;
  };

  const handleVerify = () => {
    clearErrors();
    if (!mobile) {
      setErrors({ mobile: 'Please enter your mobile number.' });
      setShowOtp(false);
      return;
    }
    if (!isMobileValid(mobile)) {
      setErrors({ mobile: 'Please enter a valid mobile number.' });
      setShowOtp(false);
      return;
    }
    setShowOtp(true);
    setErrors({});
  };

  const handleConfirmOtp = () => {
    if (!otp || otp.trim() === '') {
      setErrors((prev) => ({ ...prev, otp: 'Please enter the verification code.' }));
      return;
    }
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    const form = e.currentTarget;
    const username = form.username?.value?.trim();
    const password = form.password?.value?.trim();

    const newErrors = {};

    if (!username) newErrors.username = 'Username or email is required.';
    if (!password) newErrors.password = 'Password is required.';

    if (isSignUp) {
      if (!mobile) newErrors.mobile = 'Mobile number is required.';
      else if (!isMobileValid(mobile)) newErrors.mobile = 'Please enter a valid mobile number.';
      if (showOtp && (!otp || otp.trim() === '')) newErrors.otp = 'Please enter verification code.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigate('/dashboard');
  };

  const handleSwitch = (toSignUp) => {
    clearErrors();
    setShowOtp(false);
    setOtp('');
    if (toSignUp) {
      signInRef.current?.reset();
    } else {
      signUpRef.current?.reset();
      setMobile('');
    }
    setIsSignUp(toSignUp);
  };

  return (
    <div className="auth-container">
      <div className="left">
        <h1>SkinIQ</h1>
        <p className="intro">
          Welcome to SkinIQ — Your AI-Powered Skin Health Monitoring and Personalized Care Platform
        </p>
      </div>

      <div className="right">
        <div className="auth-forms" role="region" aria-label="Authentication forms">
          <div className="tab-toggle">
            <button
              className={!isSignUp ? 'active' : ''}
              onClick={() => handleSwitch(false)}
              type="button"
            >
              Sign In
            </button>
            <button
              className={isSignUp ? 'active' : ''}
              onClick={() => handleSwitch(true)}
              type="button"
            >
              Sign Up
            </button>
          </div>

          <div className={`form-slider ${isSignUp ? 'signUp' : ''}`} aria-live="polite">
            <form ref={signInRef} className="panel" onSubmit={handleSubmit} autoComplete="on">
              <h3>Welcome Back</h3>
              <input name="username" className="input" placeholder="Username or email" aria-invalid={!!errors.username} />
              {errors.username && <div className="error">{errors.username}</div>}

              <input name="password" type="password" className="input" placeholder="Password" aria-invalid={!!errors.password} />
              {errors.password && <div className="error">{errors.password}</div>}

              <button className="action" type="submit">Sign In</button>

              <div className="muted">
                Forgot password?{' '}
                <button type="button" onClick={() => alert('Reset flow')} style={{ border: 'none', background: 'transparent', color: '#2d8cff', cursor:'pointer' }}>
                  Reset
                </button>
              </div>
            </form>

            <form ref={signUpRef} className="panel" onSubmit={handleSubmit} autoComplete="on">
              <h3>Create Account</h3>
              <input name="username" className="input" placeholder="Choose a username or email" aria-invalid={!!errors.username} />
              {errors.username && <div className="error">{errors.username}</div>}

              <input name="password" type="password" className="input" placeholder="Create a password" aria-invalid={!!errors.password} />
              {errors.password && <div className="error">{errors.password}</div>}

              <div className="phone-verify" style={{ marginTop: 6 }}>
                <div style={{ flex: 1 }}>
                  <PhoneInput
                    country={'us'}
                    value={mobile}
                    onChange={(phone) => { setMobile(phone); setErrors((p) => ({ ...p, mobile: undefined })); }}
                    inputProps={{ name: 'mobile', required: false, autoComplete: 'tel' }}
                    inputStyle={{ width: '100%' }}
                    containerStyle={{ width: '100%' }}
                  />
                  {errors.mobile && <div className="error">{errors.mobile}</div>}
                </div>

                <button
                  type="button"
                  className="verify-btn small"
                  onClick={handleVerify}
                  aria-pressed={showOtp}
                  style={{ marginLeft: 8 }}
                >
                  Verify
                </button>
              </div>

              {showOtp && (
                <div className="otp-row" style={{ justifyContent: 'center', marginTop: 6 }}>
                  <input
                    className="otp-input"
                    placeholder="Enter code"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value); setErrors((p) => ({ ...p, otp: undefined })); }}
                  />
                  <button type="button" className="otp-action" onClick={handleConfirmOtp}>Confirm</button>
                  {errors.otp && <div style={{ width: '100%', textAlign: 'center' }}><div className="error">{errors.otp}</div></div>}
                </div>
              )}

              <button className="action" type="submit">Sign Up</button>
              <div className="muted">
                Already have an account?{' '}
                <button type="button" onClick={() => handleSwitch(false)} style={{ border: 'none', background: 'transparent', color: '#3a86ff', cursor:'pointer' }}>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
