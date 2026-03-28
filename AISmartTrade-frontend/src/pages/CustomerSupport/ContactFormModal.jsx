import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaTag,
  FaEdit,
  FaCheck,
  FaArrowRight,
  FaHeadset,
  FaShieldAlt,
  FaClock,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --nb:#00d4ff; --np:#7c3aed; --nc:#06ffd4; --ng:#00ff94;
    --nr:#ff4d6d; --ny:#ffd700; --dark:#060912;
    --glass:rgba(255,255,255,0.04); --gb:rgba(0,212,255,0.12);
  }

  @keyframes cmShim  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes cmDot   { 0%,100%{opacity:.4;transform:scale(.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes cmOrb   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-12px) scale(1.05)} }
  @keyframes cmScan  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
  @keyframes cmPulse { 0%,100%{box-shadow:0 0 10px rgba(0,212,255,.25)} 50%{box-shadow:0 0 24px rgba(0,212,255,.6),0 0 48px rgba(124,58,237,.2)} }
  @keyframes cmIn    { from{opacity:0;transform:scale(.96) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes cmSpin  { to{transform:rotate(360deg)} }
  @keyframes cmGrid  { 0%,100%{opacity:.04} 50%{opacity:.08} }

  /* ── backdrop ── */
  .cm-backdrop {
    position:fixed; inset:0;
    background:rgba(5,8,16,0.85);
    backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center;
    z-index:10000; padding:16px;
    font-family:'Inter',sans-serif;
  }

  /* ── modal shell ── */
  .cm-modal {
    width:100%; max-width:900px;
    max-height:94vh;
    background:#060912;
    border:1px solid var(--gb);
    border-radius:24px;
    overflow:hidden;
    display:flex; flex-direction:column;
    position:relative;
    animation:cmIn .25s ease-out;
    animation:cmPulse 4s ease-in-out infinite, cmIn .25s ease-out;
  }

  /* gradient border mask */
  .cm-modal::before {
    content:'';
    position:absolute; inset:-1px; border-radius:24px; padding:1px;
    background:linear-gradient(135deg,rgba(0,212,255,.3),transparent 50%,rgba(124,58,237,.3));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    pointer-events:none; z-index:0;
  }

  /* grid overlay */
  .cm-modal::after {
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(0,212,255,.045) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,.045) 1px,transparent 1px);
    background-size:48px 48px;
    animation:cmGrid 5s ease-in-out infinite;
    pointer-events:none; z-index:0;
  }

  /* orbs */
  .cm-orb {
    position:absolute; border-radius:50%;
    filter:blur(70px); pointer-events:none; z-index:0;
  }

  /* ── header ── */
  .cm-header {
    position:relative; z-index:2;
    background:rgba(0,212,255,0.04);
    border-bottom:1px solid rgba(0,212,255,0.1);
    padding:20px 24px;
    display:flex; align-items:center; justify-content:space-between;
    flex-shrink:0;
  }
  /* scan line on header top */
  .cm-header::before {
    content:'';
    position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,var(--nb),var(--nc),var(--np),var(--nb),transparent);
    background-size:200% 100%;
    animation:cmScan 4s linear infinite;
  }
  .cm-header-icon {
    width:46px; height:46px; border-radius:14px;
    background:rgba(0,212,255,0.1);
    border:1px solid rgba(0,212,255,0.25);
    display:flex; align-items:center; justify-content:center;
    color:var(--nb); font-size:20px; flex-shrink:0;
    box-shadow:0 0 16px rgba(0,212,255,0.25);
  }
  .cm-header-title {
    font-family:'Orbitron',sans-serif;
    font-size:clamp(1rem,2vw,1.3rem); font-weight:700; color:#fff;
    margin:0 0 3px;
  }
  .cm-header-sub { font-size:12px; color:rgba(255,255,255,.4); margin:0; }
  .cm-close-btn {
    width:36px; height:36px; border-radius:10px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.6); cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:all .2s; flex-shrink:0;
  }
  .cm-close-btn:hover {
    background:rgba(255,77,109,.1);
    border-color:rgba(255,77,109,.3);
    color:var(--nr);
  }
  .cm-mobile-toggle {
    width:36px; height:36px; border-radius:10px;
    background:rgba(0,212,255,.07);
    border:1px solid rgba(0,212,255,.2);
    color:var(--nb); cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:all .2s; margin-right:8px;
  }
  .cm-mobile-toggle:hover { background:rgba(0,212,255,.15); }

  /* ── body layout ── */
  .cm-body {
    display:flex; flex:1; min-height:0; position:relative; z-index:2;
    overflow:hidden;
  }

  /* ── sidebar ── */
  .cm-sidebar {
    width:280px; flex-shrink:0;
    background:rgba(0,212,255,0.03);
    border-right:1px solid rgba(0,212,255,0.08);
    padding:20px;
    display:flex; flex-direction:column; gap:14px;
    overflow-y:auto;
  }

  /* auth status chip */
  .cm-auth-chip {
    border-radius:14px; padding:14px;
    display:flex; align-items:flex-start; gap:10px;
  }
  .cm-auth-chip.logged-out {
    background:rgba(255,193,7,.05);
    border:1px solid rgba(255,193,7,.2);
  }
  .cm-auth-chip.logged-in {
    background:rgba(0,255,148,.05);
    border:1px solid rgba(0,255,148,.18);
  }
  .cm-auth-icon {
    width:34px; height:34px; border-radius:10px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center; font-size:14px;
  }
  .cm-auth-icon.warn { background:rgba(255,193,7,.1); color:#ffd700; }
  .cm-auth-icon.ok   { background:rgba(0,255,148,.1); color:var(--ng); }
  .cm-auth-label  { font-size:12px; font-weight:600; color:#fff; margin-bottom:2px; }
  .cm-auth-sublabel{ font-size:11px; color:rgba(255,255,255,.38); }
  .cm-login-btn {
    width:100%; margin-top:10px; padding:9px 14px;
    background:linear-gradient(135deg,#ffd700,#f97316);
    border:none; border-radius:10px;
    color:#060912; font-weight:700; font-size:12px;
    font-family:'Inter',sans-serif; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:6px;
    transition:transform .2s, box-shadow .3s;
    box-shadow:0 0 16px rgba(255,215,0,.3);
  }
  .cm-login-btn:hover { transform:scale(1.04); box-shadow:0 0 28px rgba(255,215,0,.5); }

  /* sidebar section title */
  .cm-sidebar-title {
    font-family:'Orbitron',sans-serif;
    font-size:11px; font-weight:600; letter-spacing:1.5px;
    color:var(--nb); text-transform:uppercase;
    display:flex; align-items:center; gap:7px;
  }
  .cm-sidebar-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--nc); box-shadow:0 0 6px var(--nc);
    animation:cmDot 1.6s ease-in-out infinite;
  }

  /* support option cards */
  .cm-support-card {
    border-radius:12px; padding:12px 14px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(0,212,255,.1);
    display:flex; align-items:center; gap:10px;
    cursor:pointer; transition:all .25s;
    text-align:left; width:100%;
    font-family:'Inter',sans-serif;
  }
  .cm-support-card:hover {
    background:rgba(0,212,255,.07);
    border-color:rgba(0,212,255,.25);
    transform:translateY(-2px);
  }
  .cm-support-card.whatsapp:hover {
    background:rgba(0,255,148,.06);
    border-color:rgba(0,255,148,.25);
  }
  .cm-sc-icon {
    width:36px; height:36px; border-radius:10px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center; font-size:15px;
  }
  .cm-sc-icon.blue  { background:rgba(0,212,255,.1); color:var(--nb); }
  .cm-sc-icon.green { background:rgba(0,255,148,.1); color:var(--ng); }
  .cm-sc-label { font-size:13px; font-weight:600; color:#fff; }
  .cm-sc-sub   { font-size:11px; color:rgba(255,255,255,.38); }

  /* info list */
  .cm-info-list { display:flex; flex-direction:column; gap:10px; padding-top:12px; border-top:1px solid rgba(0,212,255,.08); }
  .cm-info-item { display:flex; align-items:center; gap:8px; font-size:12px; color:rgba(255,255,255,.4); }
  .cm-info-icon { font-size:11px; flex-shrink:0; }

  /* ── form panel ── */
  .cm-form-panel {
    flex:1; padding:24px;
    display:flex; flex-direction:column; gap:16px;
    overflow-y:auto; min-width:0;
  }

  /* form row */
  .cm-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:540px){ .cm-form-row{ grid-template-columns:1fr; } }

  /* field group */
  .cm-field { display:flex; flex-direction:column; gap:7px; }
  .cm-label {
    display:flex; align-items:center; gap:6px;
    font-size:12px; font-weight:600; color:rgba(255,255,255,.55);
    letter-spacing:.4px; text-transform:uppercase;
  }
  .cm-label-icon { color:var(--nb); font-size:10px; }

  /* edit/save btn inline */
  .cm-edit-btn {
    margin-left:auto; background:none; border:none; cursor:pointer;
    padding:2px 6px; border-radius:6px;
    font-size:11px; font-weight:600; display:flex; align-items:center; gap:4px;
    transition:all .2s;
  }
  .cm-edit-btn.edit { color:rgba(0,212,255,.7); }
  .cm-edit-btn.edit:hover { color:var(--nb); background:rgba(0,212,255,.08); }
  .cm-edit-btn.save { color:rgba(0,255,148,.7); }
  .cm-edit-btn.save:hover { color:var(--ng); background:rgba(0,255,148,.08); }

  /* inputs */
  .cm-input, .cm-textarea {
    width:100%; box-sizing:border-box;
    background:rgba(0,212,255,.04);
    border:1px solid rgba(0,212,255,.18);
    border-radius:12px;
    color:#fff; font-size:13px;
    font-family:'Inter',sans-serif;
    outline:none;
    transition:border-color .25s, box-shadow .25s;
  }
  .cm-input { padding:11px 14px; }
  .cm-textarea { padding:11px 14px; resize:none; min-height:120px; flex:1; }
  .cm-input::placeholder, .cm-textarea::placeholder { color:rgba(255,255,255,.25); }
  .cm-input:focus, .cm-textarea:focus {
    border-color:var(--nb);
    box-shadow:0 0 0 3px rgba(0,212,255,.12), 0 0 18px rgba(0,212,255,.08);
  }
  .cm-input:disabled {
    background:rgba(255,255,255,.03);
    border-color:rgba(255,255,255,.08);
    color:rgba(255,255,255,.3);
    cursor:not-allowed;
  }

  /* message field flex */
  .cm-msg-field { display:flex; flex-direction:column; gap:7px; flex:1; min-height:0; }

  /* submit btn */
  .cm-submit {
    width:100%; padding:14px;
    border:none; border-radius:14px;
    font-weight:700; font-size:14px;
    font-family:'Inter',sans-serif;
    cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
    transition:transform .25s, box-shadow .3s;
    flex-shrink:0;
  }
  .cm-submit.active {
    background:linear-gradient(135deg,var(--nb),var(--np));
    color:#fff;
    box-shadow:0 0 28px rgba(0,212,255,.45);
  }
  .cm-submit.active:hover:not(:disabled) {
    transform:scale(1.03);
    box-shadow:0 0 50px rgba(0,212,255,.65),0 0 90px rgba(124,58,237,.3);
  }
  .cm-submit.disabled {
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.3);
    cursor:not-allowed;
  }
  .cm-spinner {
    width:16px; height:16px;
    border:2px solid rgba(255,255,255,.2);
    border-top-color:#fff;
    border-radius:50%;
    animation:cmSpin .8s linear infinite;
  }

  /* ── mobile sidebar toggle ── */
  @media(max-width:1023px){
    .cm-sidebar { width:100%; border-right:none; border-bottom:1px solid rgba(0,212,255,.08); }
    .cm-body    { flex-direction:column; }
    .cm-sidebar.collapsed { display:none; }
  }
  @media(min-width:1024px){
    .cm-mobile-toggle { display:none !important; }
  }
`;

const ContactFormModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkAuthentication();
      setIsMobileMenuOpen(false);
    }
  }, [isOpen]);

  const checkAuthentication = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (userData && token) {
        setUser(userData);
        setIsLoggedIn(true);
        setFormData((p) => ({
          ...p,
          name: userData.name || userData.username || "",
          email: userData.email || "",
        }));
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setIsLoggedIn(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleNameEdit = () => setIsEditingName(true);
  const handleNameSave = () => setIsEditingName(false);
  const handleLoginRedirect = () => {
    onClose();
    navigate("/login");
  };
  const handleWhatsAppRedirect = () => {
    const url = `https://wa.me/923065278287?text=${encodeURIComponent("Hello! I need help with my inquiry.")}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login to send a message");
      handleLoginRedirect();
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await API.post("/contact", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        userId: user.id || user._id,
        userEmail: user.email,
      });
      if (response.data?.success) {
        setFormData({
          name: user.name || user.username || "",
          email: user.email || "",
          subject: "",
          message: "",
        });
        setIsEditingName(false);
        onClose();
      } else
        throw new Error(response.data?.message || "Failed to send message");
    } catch (error) {
      if (error.response?.status === 404)
        alert("Contact service unavailable. Please try WhatsApp support.");
      else if (error.response?.status === 500)
        alert("Server error. Please try again later.");
      else if (error.request)
        alert("Network error. Please check your connection.");
      else alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="cm-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="cm-modal">
          {/* Orbs */}
          <div
            className="cm-orb"
            style={{
              width: 320,
              height: 320,
              background:
                "radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)",
              top: -100,
              left: -80,
              animation: "cmOrb 12s ease-in-out infinite",
            }}
          />
          <div
            className="cm-orb"
            style={{
              width: 240,
              height: 240,
              background:
                "radial-gradient(circle,rgba(0,212,255,.15) 0%,transparent 70%)",
              bottom: -60,
              right: -40,
              animation: "cmOrb 15s ease-in-out infinite reverse",
            }}
          />

          {/* ── Header ── */}
          <div className="cm-header">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="cm-header-icon">
                <FaHeadset />
              </div>
              <div>
                <p className="cm-header-title">Contact Support</p>
                <p className="cm-header-sub">
                  Get help with orders, products, or any questions
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                className="cm-mobile-toggle"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
              >
                {isMobileMenuOpen ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                )}
              </button>
              <button className="cm-close-btn" onClick={onClose}>
                <FaTimes size={14} />
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="cm-body">
            {/* ── Sidebar ── */}
            <div
              className={`cm-sidebar ${!isMobileMenuOpen ? "collapsed" : ""}`}
              style={{}}
              id="cm-sidebar-panel"
            >
              {/* Force show on desktop via CSS, toggle on mobile */}

              {/* Auth chip */}
              {!isLoggedIn ? (
                <div className="cm-auth-chip logged-out">
                  <div className="cm-auth-icon warn">
                    <FaShieldAlt />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="cm-auth-label">Login Required</div>
                    <div className="cm-auth-sublabel">
                      Use your account for personalized support
                    </div>
                    <button
                      className="cm-login-btn"
                      onClick={handleLoginRedirect}
                    >
                      Login to Continue <FaArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cm-auth-chip logged-in">
                  <div className="cm-auth-icon ok">
                    <FaCheck />
                  </div>
                  <div>
                    <div className="cm-auth-label">Welcome back!</div>
                    <div
                      className="cm-auth-sublabel"
                      style={{
                        maxWidth: 160,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user?.email}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick support */}
              <div className="cm-sidebar-title">
                <div className="cm-sidebar-dot" />
                Quick Support
              </div>

              <div className="cm-support-card">
                <div className="cm-sc-icon blue">
                  <FaHeadset />
                </div>
                <div>
                  <div className="cm-sc-label">Email Support</div>
                  <div className="cm-sc-sub">24–48 hour response</div>
                </div>
              </div>

              <button
                className="cm-support-card whatsapp"
                onClick={handleWhatsAppRedirect}
              >
                <div className="cm-sc-icon green">
                  <FaWhatsapp />
                </div>
                <div>
                  <div className="cm-sc-label">WhatsApp Chat</div>
                  <div className="cm-sc-sub">Instant response</div>
                </div>
              </button>

              {/* Info list */}
              <div className="cm-info-list">
                <div className="cm-info-item">
                  <FaClock
                    className="cm-info-icon"
                    style={{ color: "var(--nb)" }}
                  />{" "}
                  24/7 Email Support
                </div>
                <div className="cm-info-item">
                  <FaShieldAlt
                    className="cm-info-icon"
                    style={{ color: "var(--ng)" }}
                  />{" "}
                  Secure &amp; Private
                </div>
                <div className="cm-info-item">
                  <FaHeadset
                    className="cm-info-icon"
                    style={{ color: "var(--np)" }}
                  />{" "}
                  Expert Assistance
                </div>
              </div>
            </div>

            {/* ── Form Panel ── */}
            <div className="cm-form-panel">
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {/* Name + Email */}
                <div className="cm-form-row">
                  <div className="cm-field">
                    <label className="cm-label">
                      <FaUser className="cm-label-icon" />
                      Your Name
                      {isLoggedIn && !isEditingName && (
                        <button
                          type="button"
                          className="cm-edit-btn edit"
                          onClick={handleNameEdit}
                        >
                          <FaEdit size={9} /> Edit
                        </button>
                      )}
                      {isLoggedIn && isEditingName && (
                        <button
                          type="button"
                          className="cm-edit-btn save"
                          onClick={handleNameSave}
                        >
                          <FaCheck size={9} /> Save
                        </button>
                      )}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoggedIn && !isEditingName}
                      placeholder="Full name"
                      className="cm-input"
                    />
                  </div>

                  <div className="cm-field">
                    <label className="cm-label">
                      <FaEnvelope className="cm-label-icon" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoggedIn}
                      placeholder="your@email.com"
                      className="cm-input"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="cm-field">
                  <label className="cm-label">
                    <FaTag className="cm-label-icon" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief subject of your inquiry"
                    className="cm-input"
                  />
                </div>

                {/* Message */}
                <div className="cm-msg-field">
                  <label className="cm-label">
                    <FaPaperPlane className="cm-label-icon" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your issue or question in detail..."
                    className="cm-textarea"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isLoggedIn}
                  className={`cm-submit ${!isLoggedIn || isSubmitting ? "disabled" : "active"}`}
                >
                  {!isLoggedIn ? (
                    "Please Login to Send Message"
                  ) : isSubmitting ? (
                    <>
                      <div className="cm-spinner" /> Sending Your Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={13} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Force sidebar visible on desktop */}
          <style>{`
            @media(min-width:1024px){
              #cm-sidebar-panel{ display:flex !important; }
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default ContactFormModal;
