import React, { useState } from "react";
import {
  FaUser, FaLock, FaEye, FaEyeSlash,
  FaArrowRight, FaShieldAlt, FaBolt,
} from "react-icons/fa";
import MainLogo from "../../assets/White Logo.png";
import { Link } from "react-router-dom";
import API from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root{
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --dark:#060912; --glass:rgba(255,255,255,.04); --gb:rgba(0,212,255,.12);
  }

  @keyframes lgGrid  { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes lgOrb   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-16px) scale(1.06)} }
  @keyframes lgShim  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes lgScan  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes lgPulse { 0%,100%{box-shadow:0 0 14px rgba(0,212,255,.3),0 0 0 0 rgba(0,212,255,0)} 50%{box-shadow:0 0 30px rgba(0,212,255,.6),0 0 60px rgba(124,58,237,.25)} }
  @keyframes lgIn    { from{opacity:0;transform:translateY(20px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes lgDot   { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes lgSpin  { to{transform:rotate(360deg)} }
  @keyframes lgFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

  /* ── page wrapper ── */
  .lg-page {
    min-height:100vh;
    background:#060912;
    display:flex; align-items:center; justify-content:center;
    padding:24px; font-family:'Inter',sans-serif;
    position:relative; overflow:hidden;
  }

  /* grid overlay */
  .lg-page::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:54px 54px;
    animation:lgGrid 5s ease-in-out infinite;
    pointer-events:none;
  }

  /* ambient orbs */
  .lg-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none;
  }

  /* ── card ── */
  .lg-card {
    width:100%; max-width:440px;
    background:rgba(255,255,255,.04);
    backdrop-filter:blur(24px);
    -webkit-backdrop-filter:blur(24px);
    border:1px solid rgba(0,212,255,.12);
    border-radius:28px;
    overflow:hidden;
    position:relative; z-index:1;
    animation:lgIn .35s ease-out, lgPulse 4s ease-in-out infinite;
  }

  /* gradient border mask */
  .lg-card::before {
    content:''; position:absolute; inset:-1px; border-radius:28px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.35),transparent 50%,rgba(124,58,237,.35));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
  }

  /* ── header ── */
  .lg-header {
    padding:28px 32px 24px;
    background:rgba(0,212,255,.04);
    border-bottom:1px solid rgba(0,212,255,.08);
    text-align:center; position:relative; overflow:hidden;
  }
  /* scan line */
  .lg-header::after {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,var(--nb),var(--nc),var(--np),var(--nb),transparent);
    background-size:200% 100%;
    animation:lgScan 4s linear infinite;
  }
  .lg-logo-row {
    display:flex; align-items:center; justify-content:center; gap:10px;
    margin-bottom:6px;
  }
  .lg-logo { height:36px; }
  .lg-brand {
    font-family:'Orbitron',sans-serif; font-weight:700; font-size:1.15rem;
    background:linear-gradient(135deg,var(--nb) 0%,var(--nc) 50%,var(--np) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:lgShim 3s linear infinite;
  }
  .lg-tagline { font-size:12px; color:rgba(255,255,255,.35); letter-spacing:.3px; }

  /* ── body ── */
  .lg-body { padding:28px 32px; }

  .lg-welcome {
    font-family:'Orbitron',sans-serif;
    font-size:1.25rem; font-weight:700; color:#fff;
    text-align:center; margin:0 0 6px;
  }
  .lg-welcome-sub {
    font-size:12px; color:rgba(255,255,255,.35);
    text-align:center; margin:0 0 28px;
    display:flex; align-items:center; justify-content:center; gap:7px;
  }
  .lg-welcome-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 6px var(--nc);
    animation:lgDot 1.5s ease-in-out infinite;
  }

  /* ── field ── */
  .lg-field { margin-bottom:18px; }
  .lg-label {
    display:block; margin-bottom:8px;
    font-size:11px; font-weight:600; letter-spacing:.8px;
    color:rgba(255,255,255,.45); text-transform:uppercase;
  }
  .lg-input-wrap { position:relative; }
  .lg-input-icon {
    position:absolute; left:14px; top:50%; transform:translateY(-50%);
    color:rgba(0,212,255,.55); font-size:13px; pointer-events:none;
  }
  .lg-input {
    width:100%; box-sizing:border-box;
    padding:12px 14px 12px 42px;
    background:rgba(0,212,255,.04);
    border:1px solid rgba(0,212,255,.18);
    border-radius:12px;
    color:#fff; font-size:14px;
    font-family:'Inter',sans-serif;
    outline:none;
    transition:border-color .25s, box-shadow .25s;
  }
  .lg-input::placeholder { color:rgba(255,255,255,.22); }
  .lg-input:focus {
    border-color:var(--nb);
    box-shadow:0 0 0 3px rgba(0,212,255,.12), 0 0 20px rgba(0,212,255,.08);
  }
  .lg-input:disabled { opacity:.5; cursor:not-allowed; }
  .lg-eye-btn {
    position:absolute; right:14px; top:50%; transform:translateY(-50%);
    background:none; border:none; cursor:pointer;
    color:rgba(255,255,255,.35); font-size:14px;
    transition:color .2s; padding:0;
  }
  .lg-eye-btn:hover { color:var(--nb); }

  /* ── remember / forgot row ── */
  .lg-row {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:24px;
  }
  .lg-remember {
    display:flex; align-items:center; gap:8px;
    font-size:12px; color:rgba(255,255,255,.4);
    cursor:pointer;
  }
  .lg-checkbox {
    width:16px; height:16px; border-radius:5px;
    background:rgba(0,212,255,.06);
    border:1px solid rgba(0,212,255,.25);
    accent-color:var(--nb); cursor:pointer;
  }
  .lg-forgot {
    font-size:12px; font-weight:600;
    color:rgba(0,212,255,.7);
    text-decoration:none; transition:color .2s;
  }
  .lg-forgot:hover { color:var(--nb); text-shadow:0 0 12px rgba(0,212,255,.5); }

  /* ── submit ── */
  .lg-submit {
    width:100%; padding:14px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    border:none; border-radius:14px;
    color:#fff; font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif;
    cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    box-shadow:0 0 28px rgba(0,212,255,.45);
    transition:transform .25s, box-shadow .3s;
    margin-bottom:20px;
  }
  .lg-submit:hover:not(:disabled) {
    transform:scale(1.03);
    box-shadow:0 0 50px rgba(0,212,255,.65),0 0 90px rgba(124,58,237,.3);
  }
  .lg-submit:disabled { opacity:.6; cursor:not-allowed; transform:none; }
  .lg-spinner {
    width:16px; height:16px;
    border:2px solid rgba(255,255,255,.25);
    border-top-color:#fff; border-radius:50%;
    animation:lgSpin .8s linear infinite;
  }

  /* register link */
  .lg-register-row {
    text-align:center; font-size:13px; color:rgba(255,255,255,.35);
  }
  .lg-register-link {
    color:var(--nb); font-weight:600; text-decoration:none;
    transition:color .2s, text-shadow .2s;
  }
  .lg-register-link:hover { color:var(--nc); text-shadow:0 0 12px rgba(6,255,212,.4); }

  /* ── trust badges ── */
  .lg-trust {
    display:flex; align-items:center; justify-content:center; gap:16px;
    margin-top:22px; padding-top:18px;
    border-top:1px solid rgba(0,212,255,.07);
  }
  .lg-trust-item {
    display:flex; align-items:center; gap:5px;
    font-size:10px; color:rgba(255,255,255,.25); letter-spacing:.3px;
  }
  .lg-trust-icon { font-size:11px; }

  /* ── footer ── */
  .lg-footer {
    padding:14px 32px;
    border-top:1px solid rgba(0,212,255,.07);
    background:rgba(0,212,255,.02);
  }
  .lg-footer-text {
    text-align:center; font-size:10px;
    color:rgba(255,255,255,.2); letter-spacing:.3px;
  }
`;

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const res = await API.post("/auth/login", { email: email.trim(), password });
      if (res.data?.token) {
        login(res.data.user, res.data.token);
      } else {
        toast.error(res.data?.message || "Login failed - no token received");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) toast.error(err.response.data?.message || "Invalid email or password");
        else if (err.response.status === 403) toast.error("Your account has been blocked. Please contact admin.");
        else if (err.response.status === 500) toast.error("Server error. Please try again later.");
        else toast.error(err.response.data?.message || `Login failed (${err.response.status})`);
      } else if (err.request) {
        toast.error("Cannot connect to server. Please check if backend is running.");
      } else {
        toast.error("Login failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      <div className="lg-page">
        {/* Orbs */}
        <div className="lg-orb" style={{ width:500, height:500, background:"radial-gradient(circle,rgba(124,58,237,.22) 0%,transparent 70%)", top:-180, left:-130, animation:"lgOrb 13s ease-in-out infinite" }} />
        <div className="lg-orb" style={{ width:380, height:380, background:"radial-gradient(circle,rgba(0,212,255,.16) 0%,transparent 70%)", bottom:-100, right:-80, animation:"lgOrb 16s ease-in-out infinite reverse" }} />
        <div className="lg-orb" style={{ width:250, height:250, background:"radial-gradient(circle,rgba(6,255,212,.1) 0%,transparent 70%)", top:"40%", right:"10%", animation:"lgOrb 10s ease-in-out infinite 1.5s" }} />

        {/* Card */}
        <div className="lg-card">

          {/* Header */}
          <div className="lg-header">
            <div className="lg-logo-row">
              <img src={MainLogo} alt="AISmartTrade Logo" className="lg-logo" />
              <span className="lg-brand">AISmartTrade</span>
            </div>
            <p className="lg-tagline">Digital Marketplace for Wholesale Trading</p>
          </div>

          {/* Body */}
          <div className="lg-body">
            <h2 className="lg-welcome">Welcome Back</h2>
            <div className="lg-welcome-sub">
              <div className="lg-welcome-dot" />
              Sign in to your account
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="lg-field">
                <label className="lg-label" htmlFor="email">Email Address</label>
                <div className="lg-input-wrap">
                  <FaUser className="lg-input-icon" />
                  <input
                    id="email" type="email"
                    className="lg-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="lg-field">
                <label className="lg-label" htmlFor="password">Password</label>
                <div className="lg-input-wrap">
                  <FaLock className="lg-input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="lg-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required disabled={loading}
                    style={{ paddingRight:44 }}
                  />
                  <button
                    type="button" className="lg-eye-btn"
                    onClick={() => setShowPassword(v => !v)}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="lg-row">
                <label className="lg-remember">
                  <input
                    type="checkbox" className="lg-checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="lg-forgot">Forgot password?</Link>
              </div>

              {/* Submit */}
              <button type="submit" className="lg-submit" disabled={loading}>
                {loading
                  ? <><div className="lg-spinner" /> Signing In...</>
                  : <><FaArrowRight size={12} /> Sign In</>}
              </button>

              {/* Register */}
              <div className="lg-register-row">
                Don't have an account?{" "}
                <Link to="/register" className="lg-register-link">Register here</Link>
              </div>

              {/* Trust badges */}
              <div className="lg-trust">
                <div className="lg-trust-item">
                  <FaShieldAlt className="lg-trust-icon" style={{ color:"var(--ng)" }} />
                  Secure Login
                </div>
                <div className="lg-trust-item">
                  <FaBolt className="lg-trust-icon" style={{ color:"var(--nb)" }} />
                  B2B Platform
                </div>
                <div className="lg-trust-item">
                  <FaUser className="lg-trust-icon" style={{ color:"var(--np)" }} />
                  Verified Sellers
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="lg-footer">
            <p className="lg-footer-text">
              © 2025 AISmartTrade — Faculty of Computer Science, Green International University
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;