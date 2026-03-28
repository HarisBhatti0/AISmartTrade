import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaLock, FaStore, FaShoppingCart,
  FaChevronDown, FaInfoCircle, FaArrowRight,
  FaShieldAlt, FaLayerGroup, FaBolt,
} from "react-icons/fa";
import API from "../../api/axiosInstance";
import { toast } from "react-toastify";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4;
    --ng:#00ff94; --nr:#ff4d6d; --ny:#ffd700;
    --dark:#060912;
  }

  @keyframes rgOrb    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-16px) scale(1.06)} }
  @keyframes rgGrid   { 0%,100%{opacity:.04} 50%{opacity:.08} }
  @keyframes rgDot    { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes rgShim   { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes rgFadeUp { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes rgScan   { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes rgScanH  { 0%{background-position:-100% 0} 100%{background-position:200% 0} }
  @keyframes rgSpin   { to{transform:rotate(360deg)} }
  @keyframes rgPulse  { 0%,100%{box-shadow:0 0 10px rgba(0,212,255,.2),0 0 40px rgba(0,212,255,.06)} 50%{box-shadow:0 0 28px rgba(0,212,255,.5),0 0 80px rgba(124,58,237,.18)} }

  /* ── page ── */
  .rg-page {
    min-height:100vh; background:#060912;
    display:flex; align-items:center; justify-content:center;
    padding:24px 16px; position:relative; overflow:hidden;
    font-family:'Inter',sans-serif;
  }
  .rg-page::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px);
    background-size:54px 54px;
    animation:rgGrid 5s ease-in-out infinite;
    pointer-events:none;
  }
  .rg-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none; z-index:0;
  }

  /* ── shell ── */
  .rg-shell {
    width:100%; max-width:1060px;
    display:flex; flex-direction:row;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(0,212,255,.13);
    border-radius:28px; overflow:hidden;
    position:relative; z-index:1;
    animation:rgFadeUp .45s ease-out forwards, rgPulse 4s ease-in-out infinite;
    box-shadow:0 40px 100px rgba(0,0,0,.75),0 0 0 1px rgba(0,212,255,.05);
  }
  .rg-shell::before {
    content:''; position:absolute; inset:-1px; border-radius:28px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.3),transparent 50%,rgba(124,58,237,.3));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
  }

  /* ── form panel ── */
  .rg-form-panel {
    width:42%; padding:40px 36px;
    display:flex; flex-direction:column; justify-content:center;
    position:relative; z-index:1;
    border-right:1px solid rgba(0,212,255,.08);
    background:rgba(6,9,18,.65);
  }
  /* scan line top of form panel */
  .rg-form-panel::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,var(--nb),var(--nc),var(--np),var(--nb),transparent);
    background-size:200% 100%;
    animation:rgScanH 4s linear infinite;
  }

  /* ── badge ── */
  .rg-badge {
    display:inline-flex; align-items:center; gap:7px;
    padding:5px 16px; border-radius:50px;
    background:rgba(0,212,255,.07); border:1px solid rgba(0,212,255,.2);
    font-size:10px; font-weight:700; letter-spacing:1.2px;
    color:var(--nb); text-transform:uppercase; margin-bottom:14px;
  }
  .rg-badge-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 7px var(--nc);
    animation:rgDot 1.5s ease-in-out infinite;
  }

  /* ── heading ── */
  .rg-heading {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.3rem,2.5vw,1.75rem); font-weight:900;
    color:#fff; line-height:1.2; margin:0 0 6px;
  }
  .rg-heading-grad {
    background:linear-gradient(135deg,var(--nb) 0%,var(--nc) 50%,var(--np) 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:rgShim 3s linear infinite;
  }
  .rg-subheading {
    font-size:13px; color:rgba(255,255,255,.32);
    margin:0 0 26px; line-height:1.6;
  }

  /* ── fields ── */
  .rg-field { margin-bottom:16px; }
  .rg-label {
    display:block; font-size:10.5px; font-weight:700;
    letter-spacing:.9px; text-transform:uppercase;
    color:rgba(255,255,255,.38); margin-bottom:7px;
  }
  .rg-input-wrap { position:relative; }
  .rg-input-icon {
    position:absolute; left:14px; top:50%; transform:translateY(-50%);
    color:rgba(0,212,255,.45); font-size:13px; pointer-events:none; z-index:1;
    transition:color .3s;
  }
  .rg-input-wrap:focus-within .rg-input-icon { color:var(--nb); }
  .rg-input {
    width:100%; box-sizing:border-box;
    background:rgba(0,212,255,.04); border:1px solid rgba(0,212,255,.15);
    border-radius:13px; color:#fff; font-family:'Inter',sans-serif;
    font-size:13.5px; padding:12px 16px 12px 40px; outline:none;
    transition:border-color .3s, box-shadow .3s, background .3s;
    -webkit-appearance:none; appearance:none;
  }
  .rg-input::placeholder { color:rgba(255,255,255,.2); }
  .rg-input:focus {
    border-color:var(--nb); background:rgba(0,212,255,.07);
    box-shadow:0 0 0 3px rgba(0,212,255,.12),0 0 20px rgba(0,212,255,.07);
  }
  .rg-select-arrow {
    position:absolute; right:13px; top:50%; transform:translateY(-50%);
    color:rgba(0,212,255,.4); font-size:11px; pointer-events:none; z-index:1;
  }
  .rg-input option { background:#0d1220; color:#fff; }

  /* role pills — visual role switcher */
  .rg-role-pills {
    display:flex; gap:8px; margin-bottom:16px;
  }
  .rg-role-pill {
    flex:1; padding:11px 12px; border-radius:13px;
    display:flex; align-items:center; justify-content:center; gap:7px;
    font-size:12px; font-weight:600; cursor:pointer;
    transition:all .25s; border:1px solid;
    font-family:'Inter',sans-serif;
  }
  .rg-role-pill.active-buyer {
    background:rgba(0,212,255,.12); border-color:rgba(0,212,255,.35);
    color:var(--nb); box-shadow:0 0 14px rgba(0,212,255,.2);
  }
  .rg-role-pill.active-seller {
    background:rgba(124,58,237,.12); border-color:rgba(124,58,237,.35);
    color:#a78bfa; box-shadow:0 0 14px rgba(124,58,237,.2);
  }
  .rg-role-pill.inactive {
    background:rgba(255,255,255,.03); border-color:rgba(255,255,255,.08);
    color:rgba(255,255,255,.3);
  }
  .rg-role-pill:hover.inactive {
    background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.15);
    color:rgba(255,255,255,.55);
  }

  /* ── submit ── */
  .rg-submit-btn {
    width:100%; padding:14px; margin-top:6px;
    background:linear-gradient(135deg,var(--nb),var(--np));
    border:none; border-radius:14px;
    font-family:'Inter',sans-serif; font-size:14px; font-weight:700;
    color:#fff; cursor:pointer;
    box-shadow:0 0 28px rgba(0,212,255,.38);
    transition:transform .25s,box-shadow .3s,opacity .2s;
    display:flex; align-items:center; justify-content:center; gap:9px;
    letter-spacing:.3px;
  }
  .rg-submit-btn:hover:not(:disabled) {
    transform:scale(1.03);
    box-shadow:0 0 50px rgba(0,212,255,.6),0 0 90px rgba(124,58,237,.3);
  }
  .rg-submit-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
  .rg-spinner {
    width:15px; height:15px;
    border:2px solid rgba(255,255,255,.25); border-top-color:#fff;
    border-radius:50%; animation:rgSpin .8s linear infinite; flex-shrink:0;
  }

  /* ── sign in row ── */
  .rg-signin-row {
    text-align:center; margin-top:18px;
    font-size:12.5px; color:rgba(255,255,255,.3);
  }
  .rg-signin-link {
    color:var(--nb); font-weight:700; text-decoration:none; transition:all .2s;
  }
  .rg-signin-link:hover { color:var(--nc); text-shadow:0 0 12px rgba(6,255,212,.5); }

  /* ── trust strip ── */
  .rg-trust {
    display:flex; align-items:center; justify-content:center; gap:14px;
    margin-top:20px; padding-top:16px;
    border-top:1px solid rgba(0,212,255,.07);
    flex-wrap:wrap;
  }
  .rg-trust-item {
    display:flex; align-items:center; gap:5px;
    font-size:10px; color:rgba(255,255,255,.22); letter-spacing:.3px;
  }

  /* ── image panel ── */
  .rg-img-panel {
    width:58%; position:relative; overflow:hidden;
    min-height:560px; background:#060912;
  }
  .rg-img-panel img {
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover; object-position:center; transition:transform .6s ease;
  }
  .rg-img-panel:hover img { transform:scale(1.04); }
  .rg-img-panel::after {
    content:''; position:absolute; top:0; bottom:0; left:0; width:40%;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,.06),transparent);
    animation:rgScan 3s ease-in-out infinite; pointer-events:none; z-index:2;
  }
  .rg-img-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to top,rgba(6,9,18,.9) 0%,rgba(6,9,18,.35) 45%,rgba(6,9,18,.12) 100%);
    z-index:3; pointer-events:none;
  }
  .rg-img-fallback {
    position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(0,212,255,.08) 0%,rgba(124,58,237,.12) 100%);
    display:none; flex-direction:column; align-items:center; justify-content:center;
  }

  /* image text content */
  .rg-img-content {
    position:absolute; bottom:0; left:0; right:0;
    padding:36px 36px 40px; z-index:4;
  }
  .rg-img-role-badge {
    display:inline-flex; align-items:center; gap:7px;
    padding:5px 14px; border-radius:50px;
    background:rgba(0,212,255,.1); border:1px solid rgba(0,212,255,.25);
    font-size:10px; font-weight:700; letter-spacing:1px;
    color:var(--nb); text-transform:uppercase; margin-bottom:12px;
    transition:all .4s;
  }
  .rg-img-role-badge.seller-mode {
    background:rgba(124,58,237,.12); border-color:rgba(124,58,237,.3);
    color:#a78bfa;
  }
  .rg-img-title {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1.2rem,2vw,1.6rem); font-weight:900;
    color:#fff; margin:0 0 10px; line-height:1.2;
  }
  .rg-img-desc {
    font-size:13px; color:rgba(255,255,255,.5);
    line-height:1.7; margin:0 0 16px; max-width:380px;
  }

  /* stats row on image */
  .rg-img-stats {
    display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px;
  }
  .rg-img-stat {
    background:rgba(255,255,255,.06);
    border:1px solid rgba(0,212,255,.15);
    border-radius:12px; padding:10px 14px;
    display:flex; flex-direction:column; gap:2px;
  }
  .rg-img-stat-num {
    font-family:'Orbitron',sans-serif; font-size:14px; font-weight:700;
    color:var(--nb);
  }
  .rg-img-stat-label { font-size:10px; color:rgba(255,255,255,.35); letter-spacing:.4px; }

  /* seller note */
  .rg-seller-note {
    background:rgba(255,215,0,.05); border:1px solid rgba(255,215,0,.18);
    border-radius:14px; padding:13px 15px;
    display:flex; align-items:flex-start; gap:10px; max-width:400px;
  }
  .rg-seller-note-icon { color:var(--ny); font-size:14px; flex-shrink:0; margin-top:1px; }
  .rg-seller-note-text { font-size:11.5px; color:rgba(255,255,255,.5); line-height:1.6; }
  .rg-seller-note-text strong { color:var(--ny); font-weight:700; }

  /* ── responsive ── */
  @media(max-width:767px){
    .rg-shell         { flex-direction:column; max-width:460px; }
    .rg-form-panel    { width:100%; border-right:none; border-bottom:1px solid rgba(0,212,255,.08); padding:32px 24px; }
    .rg-img-panel     { width:100%; min-height:220px; }
    .rg-img-content   { padding:20px 22px 24px; }
    .rg-img-title     { font-size:1.1rem; }
    .rg-seller-note   { display:none; }
    .rg-img-stats     { display:none; }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name:"", email:"", password:"", role:"buyer" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setRole = (role) => setFormData(prev => ({ ...prev, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", formData);
      if (res.data?.message === "User registered successfully") {
        toast.success("Account created successfully!");
        if (formData.role === "seller") toast.info("Please complete your business profile to start selling");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(res.data?.message || "Registration failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const isSeller = formData.role === "seller";

  return (
    <>
      <style>{STYLES}</style>

      <div className="rg-page">
        {/* Orbs */}
        <div className="rg-orb" style={{ width:500, height:500, background:"radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)", top:-160, left:-120, animation:"rgOrb 13s ease-in-out infinite" }} />
        <div className="rg-orb" style={{ width:380, height:380, background:"radial-gradient(circle,rgba(0,212,255,.15) 0%,transparent 70%)", top:80, right:-90, animation:"rgOrb 16s ease-in-out infinite reverse" }} />
        <div className="rg-orb" style={{ width:280, height:280, background:"radial-gradient(circle,rgba(6,255,212,.1) 0%,transparent 70%)", bottom:-40, left:"38%", animation:"rgOrb 11s ease-in-out infinite 2s" }} />

        <div className="rg-shell">

          {/* ── Left: Form Panel ── */}
          <div className="rg-form-panel">
            <div className="rg-badge">
              <div className="rg-badge-dot" />
              New Account
            </div>

            <h1 className="rg-heading">
              Create Your{" "}
              <span className="rg-heading-grad">New Account</span>
            </h1>
            <p className="rg-subheading">Join Pakistan's premier wholesale marketplace</p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="rg-field">
                <label className="rg-label">Full Name</label>
                <div className="rg-input-wrap">
                  <FaUser className="rg-input-icon" />
                  <input name="name" type="text" className="rg-input" placeholder="John Doe"
                    value={formData.name} onChange={handleChange} required />
                </div>
              </div>

              {/* Email */}
              <div className="rg-field">
                <label className="rg-label">Email Address</label>
                <div className="rg-input-wrap">
                  <FaEnvelope className="rg-input-icon" />
                  <input name="email" type="email" className="rg-input" placeholder="your@email.com"
                    value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              {/* Password */}
              <div className="rg-field">
                <label className="rg-label">Password</label>
                <div className="rg-input-wrap">
                  <FaLock className="rg-input-icon" />
                  <input name="password" type="password" className="rg-input" placeholder="••••••••"
                    value={formData.password} onChange={handleChange} required minLength={6} />
                </div>
              </div>

              {/* Role — pill switcher */}
              <div className="rg-field">
                <label className="rg-label">Register As</label>
                <div className="rg-role-pills">
                  <button
                    type="button"
                    className={`rg-role-pill ${!isSeller ? "active-buyer" : "inactive"}`}
                    onClick={() => setRole("buyer")}
                  >
                    <FaShoppingCart size={12} /> Buyer
                  </button>
                  <button
                    type="button"
                    className={`rg-role-pill ${isSeller ? "active-seller" : "inactive"}`}
                    onClick={() => setRole("seller")}
                  >
                    <FaStore size={12} /> Seller
                  </button>
                </div>
                {/* Hidden select for form submission */}
                <input type="hidden" name="role" value={formData.role} />
              </div>

              {/* Submit */}
              <button type="submit" className="rg-submit-btn" disabled={loading}>
                {loading
                  ? <><div className="rg-spinner" /> Creating Account...</>
                  : <><FaArrowRight size={12} /> Create Account</>}
              </button>
            </form>

            <div className="rg-signin-row">
              Already have an account?{" "}
              <Link to="/login" className="rg-signin-link">Sign In</Link>
            </div>

            {/* Trust strip */}
            <div className="rg-trust">
              <div className="rg-trust-item"><FaShieldAlt style={{ color:"var(--ng)", fontSize:11 }} /> Verified Platform</div>
              <div className="rg-trust-item"><FaLayerGroup style={{ color:"var(--nb)", fontSize:11 }} /> B2B Wholesale</div>
              <div className="rg-trust-item"><FaBolt style={{ color:"var(--np)", fontSize:11 }} /> Instant Access</div>
            </div>
          </div>

          {/* ── Right: Image Panel ── */}
          <div className="rg-img-panel">
            <img
              src="./Images/RegisterImg.png"
              alt="AISmartTrade Registration"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="rg-img-fallback" />
            <div className="rg-img-overlay" />

            <div className="rg-img-content">
              <div className={`rg-img-role-badge ${isSeller ? "seller-mode" : ""}`}>
                <div className="rg-badge-dot" style={isSeller ? { background:"#a78bfa", boxShadow:"0 0 7px #a78bfa" } : {}} />
                {isSeller ? "Wholesale Seller" : "Verified Buyer"}
              </div>

              <h2 className="rg-img-title">
                {isSeller ? "Become a Wholesale Seller" : "Join as a Buyer"}
              </h2>

              <p className="rg-img-desc">
                {isSeller
                  ? "Reach thousands of buyers across Pakistan. Start your wholesale business today."
                  : "Access thousands of wholesale products at best prices from verified sellers."}
              </p>

              {/* Stats */}
              <div className="rg-img-stats">
                {isSeller ? (
                  <>
                    <div className="rg-img-stat">
                      <div className="rg-img-stat-num">10K+</div>
                      <div className="rg-img-stat-label">Active Buyers</div>
                    </div>
                    <div className="rg-img-stat">
                      <div className="rg-img-stat-num">Free</div>
                      <div className="rg-img-stat-label">To List</div>
                    </div>
                    <div className="rg-img-stat">
                      <div className="rg-img-stat-num">24/7</div>
                      <div className="rg-img-stat-label">Support</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rg-img-stat">
                      <div className="rg-img-stat-num">5K+</div>
                      <div className="rg-img-stat-label">Products</div>
                    </div>
                    <div className="rg-img-stat">
                      <div className="rg-img-stat-num">100+</div>
                      <div className="rg-img-stat-label">Sellers</div>
                    </div>
                    <div className="rg-img-stat">
                      <div className="rg-img-stat-num">40%</div>
                      <div className="rg-img-stat-label">Max Savings</div>
                    </div>
                  </>
                )}
              </div>

              {isSeller && (
                <div className="rg-seller-note">
                  <FaInfoCircle className="rg-seller-note-icon" />
                  <p className="rg-seller-note-text">
                    <strong>Note:</strong> After registration, you'll need to complete your
                    business profile with shop details, business type, and verification
                    documents to start selling.
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