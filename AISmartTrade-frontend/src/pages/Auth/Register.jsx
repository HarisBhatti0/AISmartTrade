import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaStore,
  FaShoppingCart,
  FaChevronDown,
  FaInfoCircle,
} from "react-icons/fa";
import API from "../../api/axiosInstance";
import { toast } from "react-toastify";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --nb: #00d4ff;
    --np: #7c3aed;
    --nc: #06ffd4;
    --ng: #00ff94;
    --nr: #ff4d6d;
    --ny: #ffd700;
    --dark: #060912;
    --glass: rgba(255,255,255,0.04);
  }

  @keyframes rgOrbMove {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(20px,-16px) scale(1.06); }
  }
  @keyframes rgGridPulse {
    0%,100% { opacity: 0.04; }
    50%     { opacity: 0.08; }
  }
  @keyframes rgDotPulse {
    0%,100% { opacity:.4; transform:scale(.7); }
    50%     { opacity:1;  transform:scale(1.3); }
  }
  @keyframes rgShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes rgFadeUp {
    from { opacity:0; transform:translateY(28px) scale(.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes rgScanNav {
    0%   { background-position:-100% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes rgSpin {
    to { transform: rotate(360deg); }
  }
  @keyframes rgFloat {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes rgNeonPulse {
    0%,100% { box-shadow: 0 0 10px rgba(0,212,255,.2), 0 0 40px rgba(0,212,255,.06); }
    50%     { box-shadow: 0 0 28px rgba(0,212,255,.5), 0 0 80px rgba(124,58,237,.18); }
  }
  @keyframes rgScanLine {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }

  /* ── Page wrapper ── */
  .rg-page {
    min-height: 100vh;
    background: #060912;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  .rg-page::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px);
    background-size: 54px 54px;
    animation: rgGridPulse 5s ease-in-out infinite;
    pointer-events: none; z-index: 0;
  }

  /* ── Outer shell ── */
  .rg-shell {
    width: 100%;
    max-width: 1060px;
    display: flex;
    flex-direction: row;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(0,212,255,0.13);
    border-radius: 28px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    animation: rgFadeUp 0.45s ease-out forwards;
    box-shadow: 0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,212,255,0.05);
  }

  .rg-shell::before {
    content: '';
    position: absolute; inset: -1px;
    border-radius: 28px; padding: 1px;
    background: linear-gradient(135deg,
      rgba(0,212,255,0.3),
      transparent 50%,
      rgba(124,58,237,0.3)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Left form panel ── */
  .rg-form-panel {
    width: 42%;
    padding: 40px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    border-right: 1px solid rgba(0,212,255,0.08);
    background: rgba(6,9,18,0.6);
  }

  /* ── Form heading ── */
  .rg-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 16px;
    border-radius: 50px;
    background: rgba(0,212,255,0.07);
    border: 1px solid rgba(0,212,255,0.2);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .rg-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #06ffd4;
    box-shadow: 0 0 7px #06ffd4;
    animation: rgDotPulse 1.5s ease-in-out infinite;
  }

  .rg-heading {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.3rem, 2.5vw, 1.75rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.2;
    margin: 0 0 6px;
  }

  .rg-subheading {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin: 0 0 26px;
    line-height: 1.6;
  }

  /* ── Fields ── */
  .rg-field {
    margin-bottom: 16px;
  }

  .rg-label {
    display: block;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 7px;
  }

  .rg-input-wrap {
    position: relative;
  }

  .rg-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0,212,255,0.45);
    font-size: 13px;
    pointer-events: none;
    z-index: 1;
    transition: color 0.3s;
  }

  .rg-input-wrap:focus-within .rg-input-icon {
    color: #00d4ff;
  }

  .rg-input {
    width: 100%;
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 13px;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    padding: 12px 16px 12px 40px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
  }

  .rg-input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .rg-input:focus {
    border-color: #00d4ff;
    background: rgba(0,212,255,0.07);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.12), 0 0 20px rgba(0,212,255,0.07);
  }

  /* select arrow */
  .rg-select-arrow {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0,212,255,0.4);
    font-size: 11px;
    pointer-events: none;
    z-index: 1;
  }

  .rg-input option {
    background: #0d1220;
    color: #fff;
  }

  /* ── Submit ── */
  .rg-submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    border: none;
    border-radius: 14px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 0 28px rgba(0,212,255,0.38);
    transition: transform 0.25s, box-shadow 0.3s, opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 6px;
    letter-spacing: 0.3px;
  }
  .rg-submit-btn:hover:not(:disabled) {
    transform: scale(1.03);
    box-shadow: 0 0 50px rgba(0,212,255,0.6), 0 0 90px rgba(124,58,237,0.3);
  }
  .rg-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .rg-spinner {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.25);
    border-top-color: #fff;
    border-radius: 50%;
    animation: rgSpin 0.8s linear infinite;
    flex-shrink: 0;
  }

  /* ── Sign in link ── */
  .rg-signin-row {
    text-align: center;
    margin-top: 18px;
    font-size: 12.5px;
    color: rgba(255,255,255,0.32);
  }

  .rg-signin-link {
    color: #00d4ff;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s;
  }
  .rg-signin-link:hover {
    color: #06ffd4;
    text-shadow: 0 0 12px rgba(6,255,212,0.5);
  }

  /* ── Right image panel ── */
  .rg-img-panel {
    width: 58%;
    position: relative;
    overflow: hidden;
    min-height: 560px;
    background: #060912;
  }

  .rg-img-panel img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s ease;
  }

  .rg-img-panel:hover img {
    transform: scale(1.04);
  }

  /* scan line sweep on image */
  .rg-img-panel::after {
    content: '';
    position: absolute; top: 0; bottom: 0; left: 0; width: 40%;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.06), transparent);
    animation: rgScanLine 3s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }

  /* dark gradient overlay on image */
  .rg-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(6,9,18,0.88) 0%,
      rgba(6,9,18,0.35) 45%,
      rgba(6,9,18,0.15) 100%
    );
    z-index: 3;
    pointer-events: none;
  }

  /* image fallback gradient */
  .rg-img-fallback {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.12) 100%);
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* text over image */
  .rg-img-content {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 36px 36px 40px;
    z-index: 4;
  }

  .rg-img-role-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 50px;
    background: rgba(0,212,255,0.1);
    border: 1px solid rgba(0,212,255,0.25);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #00d4ff;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .rg-img-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    font-weight: 900;
    color: #fff;
    margin: 0 0 10px;
    line-height: 1.2;
  }

  .rg-img-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    margin: 0 0 16px;
    max-width: 380px;
  }

  /* seller note box */
  .rg-seller-note {
    background: rgba(255,215,0,0.06);
    border: 1px solid rgba(255,215,0,0.2);
    border-radius: 14px;
    padding: 13px 15px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    max-width: 400px;
  }

  .rg-seller-note-icon {
    color: #ffd700;
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .rg-seller-note-text {
    font-size: 11.5px;
    color: rgba(255,255,255,0.55);
    line-height: 1.6;
  }

  .rg-seller-note-text strong {
    color: #ffd700;
    font-weight: 700;
  }

  /* ── Mobile responsive ── */
  @media (max-width: 767px) {
    .rg-shell {
      flex-direction: column;
      max-width: 460px;
    }
    .rg-form-panel {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid rgba(0,212,255,0.08);
      padding: 32px 24px;
    }
    .rg-img-panel {
      width: 100%;
      min-height: 220px;
    }
    .rg-img-content {
      padding: 20px 22px 24px;
    }
    .rg-img-title {
      font-size: 1.1rem;
    }
    .rg-seller-note { display: none; }
  }
`;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", formData);

      if (res.data?.message === "User registered successfully") {
        toast.success("Account created successfully!");

        if (formData.role === "seller") {
          toast.info("Please complete your business profile to start selling");
        }

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data?.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      <div className="rg-page">
        {/* Ambient orbs */}
        <div style={{
          position:'absolute', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none', zIndex:0,
          width:500, height:500,
          background:'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          top:-160, left:-120,
          animation:'rgOrbMove 13s ease-in-out infinite'
        }} />
        <div style={{
          position:'absolute', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none', zIndex:0,
          width:380, height:380,
          background:'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          top:80, right:-90,
          animation:'rgOrbMove 16s ease-in-out infinite reverse'
        }} />
        <div style={{
          position:'absolute', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none', zIndex:0,
          width:280, height:280,
          background:'radial-gradient(circle, rgba(6,255,212,0.1) 0%, transparent 70%)',
          bottom:-40, left:'38%',
          animation:'rgOrbMove 11s ease-in-out infinite 2s'
        }} />

        {/* Shell */}
        <div className="rg-shell">

          {/* ── Left: Form Panel ── */}
          <div className="rg-form-panel">
            <div className="rg-badge">
              <div className="rg-badge-dot" />
              New Account
            </div>

            <h1 className="rg-heading">Create Your<br />New Account</h1>
            <p className="rg-subheading">Join Pakistan's premier wholesale marketplace</p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="rg-field">
                <label className="rg-label">Full Name</label>
                <div className="rg-input-wrap">
                  <FaUser className="rg-input-icon" />
                  <input
                    name="name"
                    type="text"
                    className="rg-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="rg-field">
                <label className="rg-label">Email Address</label>
                <div className="rg-input-wrap">
                  <FaEnvelope className="rg-input-icon" />
                  <input
                    name="email"
                    type="email"
                    className="rg-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="rg-field">
                <label className="rg-label">Password</label>
                <div className="rg-input-wrap">
                  <FaLock className="rg-input-icon" />
                  <input
                    name="password"
                    type="password"
                    className="rg-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Role */}
              <div className="rg-field">
                <label className="rg-label">Register As</label>
                <div className="rg-input-wrap">
                  {formData.role === "buyer"
                    ? <FaShoppingCart className="rg-input-icon" />
                    : <FaStore className="rg-input-icon" />
                  }
                  <select
                    name="role"
                    className="rg-input"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="buyer">Buyer — Purchase products</option>
                    <option value="seller">Seller — Sell products</option>
                  </select>
                  <FaChevronDown className="rg-select-arrow" />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="rg-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="rg-spinner" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="rg-signin-row">
              Already have an account?{" "}
              <Link to="/login" className="rg-signin-link">Sign In</Link>
            </div>
          </div>

          {/* ── Right: Image Panel ── */}
          <div className="rg-img-panel">
            <img
              src="./Images/RegisterImg.png"
              alt="AISmartTrade Registration"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />

            {/* Fallback */}
            <div className="rg-img-fallback" />

            {/* Gradient overlay */}
            <div className="rg-img-overlay" />

            {/* Text content */}
            <div className="rg-img-content">
              <div className="rg-img-role-badge">
                <div className="rg-badge-dot" />
                {formData.role === "seller" ? "Wholesale Seller" : "Verified Buyer"}
              </div>

              <h2 className="rg-img-title">
                {formData.role === "seller"
                  ? "Become a Wholesale Seller"
                  : "Join as a Buyer"}
              </h2>

              <p className="rg-img-desc">
                {formData.role === "seller"
                  ? "Reach thousands of buyers across Pakistan. Start your wholesale business today."
                  : "Access thousands of wholesale products at best prices from verified sellers."}
              </p>

              {formData.role === "seller" && (
                <div className="rg-seller-note">
                  <FaInfoCircle className="rg-seller-note-icon" />
                  <p className="rg-seller-note-text">
                    <strong>Note:</strong> After registration, you'll need to complete
                    your business profile with shop details, business type, and
                    verification documents to start selling.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Register;